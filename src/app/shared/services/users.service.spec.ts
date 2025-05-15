import { TestBed, inject } from '@angular/core/testing';
import { User } from '../types/user-interface';
import { UsersService } from './users.service';

describe('#Serviço: Users', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersService],
    });
  });

  it('deve criar o serviço', inject([UsersService], (service: UsersService) => {
    expect(service).toBeTruthy();
  }));

  describe('#addUser', () => {
    it('deveria adicionar um usuário ao array de usuários e ao local storage se o nome não existir', inject(
      [UsersService],
      (service: UsersService) => {
        const initialLength = service.users.length;
        const user: User = { id: 1, name: 'Test User' };
        const result = service.addUser(user);
        expect(result).toBeTruthy();
        expect(service.users.length).toBe(initialLength + 1);
        expect(service.users).toContain(user);
        expect(localStorage.getItem('users')).toBe(
          JSON.stringify(service.users)
        );
      }
    ));

    it('não deveria adicionar um usuário se o nome já existir (ignorando caixa alta/baixa)', inject(
      [UsersService],
      (service: UsersService) => {
        const existingUser: User = { id: 1, name: 'Existing User' };
        service.users = [existingUser];
        localStorage.setItem('users', JSON.stringify(service.users));
        const initialLength = service.users.length;
        const newUserSameName: User = { id: 2, name: 'existing user' }; // Mesmo nome, caixa diferente
        const result = service.addUser(newUserSameName);
        expect(result).toBeFalsy();
        expect(service.users.length).toBe(initialLength);
        expect(service.users).toContain(existingUser);
        expect(service.users).not.toContain(newUserSameName);
        expect(localStorage.getItem('users')).toBe(
          JSON.stringify(service.users)
        ); // Local storage não deve mudar
      }
    ));

    it('deveria adicionar um usuário com nome diferente', inject(
      [UsersService],
      (service: UsersService) => {
        const existingUser: User = { id: 1, name: 'Existing User' };
        service.users = [existingUser];
        localStorage.setItem('users', JSON.stringify(service.users));
        const initialLength = service.users.length;
        const newUserDifferentName: User = { id: 2, name: 'New User' };
        const result = service.addUser(newUserDifferentName);
        expect(result).toBeTruthy();
        expect(service.users.length).toBe(initialLength + 1);
        expect(service.users).toContain(existingUser);
        expect(service.users).toContain(newUserDifferentName);
        expect(localStorage.getItem('users')).toBe(
          JSON.stringify(service.users)
        ); // Local storage deve ser atualizado
      }
    ));
  });

  describe('#removeUser', () => {
    it('deve remover um usuario do array de usuários e atualizar o local storage', inject(
      [UsersService],
      (service: UsersService) => {
        const user1: User = { id: 1, name: 'User 1' };
        const user2: User = { id: 2, name: 'User 2' };
        service.users = [user1, user2];
        localStorage.setItem('users', JSON.stringify(service.users));
        const initialLength = service.users.length;
        service.removeUser(1);
        expect(service.users.length).toBe(initialLength - 1);
        expect(service.users).not.toContain(user1);
        expect(localStorage.getItem('users')).toBe(
          JSON.stringify(service.users)
        );
      }
    ));

    it('não deve alterar o array de usuários se o id do usuário não existir', inject(
      [UsersService],
      (service: UsersService) => {
        const initialLength = service.users.length;
        service.removeUser(99);
        expect(service.users.length).toBe(initialLength);
        expect(localStorage.getItem('users')).toBe(
          JSON.stringify(service.users)
        );
      }
    ));
  });

  describe('#getUsers', () => {
    it('deve retornar o array de usuários atual', inject(
      [UsersService],
      (service: UsersService) => {
        const user1: User = { id: 1, name: 'User 1' };
        const user2: User = { id: 2, name: 'User 2' };
        service.users = [user1, user2];
        const users = service.getUsers();
        expect(users).toEqual([user1, user2]);
      }
    ));

    it('deve retornar um array vazio se não houver usuários', inject(
      [UsersService],
      (service: UsersService) => {
        service.users = [];
        const users = service.getUsers();
        expect(users).toEqual([]);
      }
    ));
  });

  describe('#getUserById', () => {
    it('deve retornar o usuário com o id fornecido', inject(
      [UsersService],
      (service: UsersService) => {
        const user: User = { id: 1, name: 'Test User' };
        service.users = [user];
        const foundUser = service.getUserById(1);
        expect(foundUser).toEqual(user);
      }
    ));

    it('deve retornar undefined se nenhum usuário com o id fornecido existir', inject(
      [UsersService],
      (service: UsersService) => {
        const user: User = { id: 1, name: 'Test User' };
        service.users = [user];
        const foundUser = service.getUserById(99);
        expect(foundUser).toBeUndefined();
      }
    ));
  });

  describe('#updateUser', () => {
    it('deve atualizar o usuário com o id fornecido', inject(
      [UsersService],
      (service: UsersService) => {
        const initialUser: User = { id: 1, name: 'Test User' };
        service.users = [initialUser];
        const updatedUser: User = { id: 1, name: 'Updated User' };
        service.updateUser(1, updatedUser);
        expect(service.users[0]).toEqual(updatedUser);
      }
    ));

    it('não deve atualizar nenhum usuário se o id não existir', inject(
      [UsersService],
      (service: UsersService) => {
        const initialUser: User = { id: 1, name: 'Test User' };
        service.users = [initialUser];
        const updatedUser: User = { id: 99, name: 'Updated User' };
        service.updateUser(99, updatedUser);
        expect(service.users[0]).toEqual(initialUser);
      }
    ));
  });
});
