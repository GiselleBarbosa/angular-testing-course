import { TestBed } from '@angular/core/testing';
import { TodosService } from './todos.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { FilterEnum } from '../types/filter.enum';

describe('TodosService', () => {
  let todosService: TodosService;
  let httpTestingController: HttpTestingController;
  const baseUrl = 'http://localhost:3004/todos';
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TodosService],
    });
    todosService = TestBed.inject(TodosService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('deve criar o serviço', () => {
    expect(todosService).toBeTruthy();
  });

  it('deve definir os dados iniciais', () => {
    expect(todosService.apiBaseUrl).toEqual(baseUrl);
    expect(todosService.todosSig()).toEqual([]);
    expect(todosService.filterSig()).toEqual(FilterEnum.all);
  });

  describe('#changeFilter', () => {
    it('deve alterar o filtro', () => {
      todosService.changeFilter(FilterEnum.active);
      expect(todosService.filterSig()).toEqual(FilterEnum.active);
    });
  });

  describe('#getTodos', () => {
    it('deve obter os dados corretos', () => {
      todosService.getTodos();
      const req = httpTestingController.expectOne(baseUrl);
      req.flush([{ text: 'foo', isCompleted: true, id: '1' }]);
      expect(todosService.todosSig()).toEqual([
        { text: 'foo', isCompleted: true, id: '1' },
      ]);
    });
  });

  describe('#addTodo', () => {
    it('deve criar uma tarefa', () => {
      todosService.addTodo('foo');
      const req = httpTestingController.expectOne(baseUrl);
      req.flush({ text: 'foo', isCompleted: true, id: '1' });
      expect(todosService.todosSig()).toEqual([
        { text: 'foo', isCompleted: true, id: '1' },
      ]);
    });
  });

  describe('#changeTodo', () => {
    it('deve atualizar uma tarefa', () => {
      todosService.todosSig.set([{ text: 'foo', isCompleted: true, id: '1' }]);
      todosService.changeTodo('1', 'bar');
      const req = httpTestingController.expectOne(`${baseUrl}/1`);
      req.flush({ text: 'bar', isCompleted: true, id: '1' });
      expect(todosService.todosSig()).toEqual([
        { text: 'bar', isCompleted: true, id: '1' },
      ]);
    });
  });

  describe('#removeTodo', () => {
    it('deve remover uma tarefa', () => {
      todosService.todosSig.set([{ text: 'foo', isCompleted: true, id: '1' }]);
      todosService.removeTodo('1');
      const req = httpTestingController.expectOne(`${baseUrl}/1`);
      req.flush({});
      expect(todosService.todosSig()).toEqual([]);
    });
  });

  describe('#toggleTodo', () => {
    it('deve alternar o estado de uma tarefa', () => {
      todosService.todosSig.set([{ text: 'foo', isCompleted: false, id: '1' }]);
      todosService.toggleTodo('1');
      const req = httpTestingController.expectOne(`${baseUrl}/1`);
      req.flush({ text: 'foo', isCompleted: true, id: '1' });
      expect(todosService.todosSig()).toEqual([
        { text: 'foo', isCompleted: true, id: '1' },
      ]);
    });
  });

  describe('#toggleAll', () => {
    it('deve alternar todas as tarefas', () => {
      todosService.todosSig.set([
        { text: 'foo', isCompleted: false, id: '1' },
        { text: 'bar', isCompleted: false, id: '2' },
      ]);
      todosService.toggleAll(true);
      const reqs = httpTestingController.match((request) =>
        request.url.includes(baseUrl)
      );
      reqs[0].flush({ text: 'foo', isCompleted: true, id: '1' });
      reqs[1].flush({ text: 'bar', isCompleted: true, id: '2' });
      expect(todosService.todosSig()).toEqual([
        { text: 'foo', isCompleted: true, id: '1' },
        { text: 'bar', isCompleted: true, id: '2' },
      ]);
    });
  });
});
