import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { TodosService } from '../../services/todos.service';
import { FilterEnum } from '../../types/filter.enum';

describe('#FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let todosService: TodosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FooterComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    todosService = TestBed.inject(TodosService);
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  describe('#Visibilidade', () => {
    it('deve estar oculto quando não houverem registros', () => {
      const footer = fixture.debugElement.query(
        By.css('[data-testid="footer"]')
      );
      expect(footer.classes['hidden']).toEqual(true);
    });

    it('deve estar visível quando houverem tarefas', () => {
      todosService.todosSig.set([{ id: '1', text: 'foo', isCompleted: false }]);
      fixture.detectChanges();
      const footer = fixture.debugElement.query(
        By.css('[data-testid="footer"]')
      );
      expect(footer.classes['hidden']).not.toBeDefined();
    });
  });

  describe('#Contadores', () => {
    it('deve mostrar contador para 1 tarefa', () => {
      todosService.todosSig.set([{ id: '1', text: 'foo', isCompleted: false }]);
      fixture.detectChanges();
      const todoCount = fixture.debugElement.query(
        By.css('[data-testid="todoCount"]')
      );
      expect(todoCount.nativeElement.textContent).toContain('1 item left');
    });

    it('deve mostrar contador para 2 tarefas', () => {
      todosService.todosSig.set([
        { id: '1', text: 'foo', isCompleted: false },
        { id: '2', text: 'bar', isCompleted: false },
      ]);
      fixture.detectChanges();
      const todoCount = fixture.debugElement.query(
        By.css('[data-testid="todoCount"]')
      );
      expect(todoCount.nativeElement.textContent).toContain('2 items left');
    });
  });

  describe('#Filtros', () => {
    it('deve destacar o filtro padrão', () => {
      const filterLinks = fixture.debugElement.queryAll(
        By.css('[data-testid="filterLink"]')
      );
      expect(filterLinks[0].classes['selected']).toBe(true);
    });

    it('deve destacar o filtro alterado', () => {
      todosService.filterSig.set(FilterEnum.active);
      fixture.detectChanges();
      const filterLinks = fixture.debugElement.queryAll(
        By.css('[data-testid="filterLink"]')
      );
      expect(filterLinks[1].classes['selected']).toBe(true);
    });

    it('deve mudar o filtro ao clicar', () => {
      const filterLinks = fixture.debugElement.queryAll(
        By.css('[data-testid="filterLink"]')
      );
      filterLinks[1].triggerEventHandler('click');
      expect(todosService.filterSig()).toBe(FilterEnum.active);
    });
  });
});
