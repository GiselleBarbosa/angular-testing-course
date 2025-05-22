import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';
import { UtilsService } from '../../services/utils.service';
import { By } from '@angular/platform-browser';
import { first } from 'rxjs';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  const mockUtilService = {
    range: () => {
      return [1, 2, 3, 4, 5];
    },
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PaginationComponent],
      providers: [{ provide: UtilsService, useValue: mockUtilService }],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    component.total = 50;
    component.limit = 10;
    component.currentPage = 1;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve renderizar a paginação corretamente', () => {
    const pageContainers = fixture.debugElement.queryAll(
      By.css('[data-testid="page-container"]')
    );

    expect(pageContainers.length).toBe(5);
    expect(pageContainers[0].nativeElement.textContent).toContain('1');
  });

  it('deve emitir a página clicada', () => {
    const pageContainers = fixture.debugElement.queryAll(
      By.css('[data-testid="page-container"]')
    );
    let clickedPage: number | undefined;

    component.pageChangeEvent.pipe(first()).subscribe((page) => {
      clickedPage = page;
    });
    pageContainers[0].triggerEventHandler('click');
    expect(clickedPage).toEqual(1);
  });
});
