import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TodosService } from '../../services/todos.service';
import { HeaderComponent } from './header.component';

describe('#HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let todosService: TodosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HeaderComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    todosService = TestBed.inject(TodosService);
    fixture.detectChanges();
  });

  describe('#Criação', () => {
    it('deve criar o componente', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('#Funcionalidades', () => {
    it('deve adicionar uma tarefa', () => {
      jest.spyOn(todosService, 'addTodo').mockImplementation(() => {});
      const input = fixture.debugElement.query(
        By.css('[data-testid="newTodoInput"]')
      );
      input.nativeElement.value = 'foo';
      input.nativeElement.dispatchEvent(
        new KeyboardEvent('keyup', { key: 'Enter' })
      );
      expect(todosService.addTodo).toHaveBeenCalledWith('foo');
      expect(component.text).toEqual('');
    });
  });
});
