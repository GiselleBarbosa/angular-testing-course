import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersService } from '../../services/users.service';
import { UserListComponent } from './user-list.component';
import { User } from '../../models/user-interface';

describe('#UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let usersService: UsersService;
  let storageData: string = '[]';

  beforeEach(async () => {
    const mockStorage = {
      getItem: jest.fn((key: string) => storageData),
      setItem: jest.fn((key: string, value: string) => {
        storageData = value;
      }),
      clear: jest.fn(() => {
        storageData = '[]';
      }),
    };

    Object.defineProperty(window, 'localStorage', {
      value: mockStorage,
      writable: true,
    });

    await TestBed.configureTestingModule({
      imports: [UserListComponent],
      providers: [UsersService],
    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    usersService = TestBed.inject(UsersService);

    usersService.users = [];
    storageData = '[]';

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOnInit', () => {
    it('deve chamar loadUsers ao inicializar', () => {
      const loadUsersSpy = jest.spyOn(component, 'loadUsers');
      component.ngOnInit();
      expect(loadUsersSpy).toHaveBeenCalled();
    });
  });

  describe('#loadUsers', () => {
    it('deve carregar usuários do localStorage se existir', () => {
      const mockUsers: User[] = [{ id: 1, name: 'Alice' }];

      (window.localStorage.getItem as jest.Mock).mockReturnValueOnce(
        JSON.stringify(mockUsers)
      );

      component.loadUsers();

      expect(component.usersList).toEqual(mockUsers);
      expect(component.usersService.users).toEqual(mockUsers);
    });

    it('deve manter usersList vazio se localStorage não tiver usuários', () => {
      (window.localStorage.getItem as jest.Mock).mockReturnValueOnce(null);

      component.loadUsers();

      expect(usersService.users).toEqual([]);
      expect(component.usersList).toEqual([]);
    });
  });

  describe('#addUser', () => {
    it('deve adicionar um novo usuário', () => {
      const initialUserName = 'Bob';
      component.userName = initialUserName;

      component.addUser();

      expect(component.usersList.length).toBe(1);
      expect(component.usersList[0].name).toBe(initialUserName);
      expect(component.userName).toBe('');
    });
    it('não deve adicionar usuário se userName estiver vazio', () => {
      component.userName = '';

      component.addUser();

      expect(usersService.users.length).toBe(0);
      expect(component.usersList.length).toBe(0);
    });
  });

  describe('#removeUser', () => {
    it('deve remover um usuário existente pelo id', () => {
      const user: User = { id: 1, name: 'Charlie' };
      usersService.addUser(user);
      component.loadUsers();

      component.removeUser(1);

      expect(component.usersList.length).toBe(0);
    });

    it('não deve remover nenhum usuário se id não existir', () => {
      const user: User = { id: 1, name: 'Charlie' };
      usersService.addUser(user);
      component.loadUsers();

      component.removeUser(999);

      expect(component.usersList.length).toBe(1);
      expect(component.usersList[0]).toEqual(user);
    });
  });

  describe('#editUser', () => {
    it('deve preencher userName e remover o usuário existente', () => {
      const user: User = { id: 2, name: 'Dave' };
      usersService.addUser(user);
      component.loadUsers();

      component.editUser(2);

      expect(component.userName).toBe('Dave');
      expect(component.usersList.length).toBe(0);
    });

    it('não deve alterar userName se usuário não existir', () => {
      component.editUser(1234);

      expect(component.userName).toBeUndefined();
    });
  });
});
