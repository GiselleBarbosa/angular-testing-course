import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainComponent } from './main.component';
import { TodosService } from '../../services/todos.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TodoInterface } from '../../types/todo.interface';
import { TodoComponent } from '../todo/todo.component';
import { By } from '@angular/platform-browser';

// Shallow testing
@Component({
  standalone: true,
  selector: 'app-todos-todo',
  template: '',
})
class TodoComponentMock {
  @Input({ required: true }) todo!: TodoInterface;
  @Input({ required: true }) isEditing!: boolean;
  @Output() setEditingId: EventEmitter<string | null> = new EventEmitter();
}

describe('#MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let todosService: TodosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MainComponent, HttpClientTestingModule],
    })
      .overrideComponent(MainComponent, {
        remove: { imports: [TodoComponent] },
        add: { imports: [TodoComponentMock] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    todosService = TestBed.inject(TodosService);
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  describe('#Visibilidade', () => {
    it('deve estar oculto quando não houver tarefas', () => {
      const main = fixture.debugElement.query(By.css('[data-testid="main"]'));
      expect(main.classes['hidden']).toEqual(true);
    });

    it('deve estar visível quando houver tarefas', () => {
      todosService.todosSig.set([{ id: '1', text: 'foo', isCompleted: false }]);
      fixture.detectChanges();
      const main = fixture.debugElement.query(By.css('[data-testid="main"]'));
      expect(main.classes['hidden']).not.toBeDefined();
    });
  });

  describe('#Toggle', () => {
    it('deve destacar o checkbox de marcar todas', () => {
      todosService.todosSig.set([{ id: '1', text: 'foo', isCompleted: true }]);
      fixture.detectChanges();
      const toggleAll = fixture.debugElement.query(
        By.css('[data-testid="toggleAll"]')
      );
      expect(toggleAll.nativeElement.checked).toEqual(true);
    });

    it('deve alternar todas as tarefas', () => {
      jest.spyOn(todosService, 'toggleAll').mockImplementation(() => {});
      todosService.todosSig.set([{ id: '1', text: 'foo', isCompleted: true }]);
      fixture.detectChanges();
      const toggleAll = fixture.debugElement.query(
        By.css('[data-testid="toggleAll"]')
      );
      toggleAll.nativeElement.click();
      expect(todosService.toggleAll).toHaveBeenCalledWith(false);
    });
  });

  describe('#Renderização', () => {
    it('deve renderizar a lista de tarefas', () => {
      todosService.todosSig.set([{ id: '1', text: 'foo', isCompleted: false }]);
      fixture.detectChanges();
      const todos = fixture.debugElement.queryAll(
        By.css('[data-testid="todo"]')
      );
      expect(todos.length).toEqual(1);
      expect(todos[0].componentInstance.todo).toEqual({
        id: '1',
        text: 'foo',
        isCompleted: false,
      });
      expect(todos[0].componentInstance.isEditing).toEqual(false);
    });

    it('deve alterar o editingId', () => {
      todosService.todosSig.set([{ id: '1', text: 'foo', isCompleted: false }]);
      fixture.detectChanges();
      const todos = fixture.debugElement.queryAll(
        By.css('[data-testid="todo"]')
      );
      todos[0].componentInstance.setEditingId.emit('1');
      expect(component.editingId).toEqual('1');
    });
  });
});
