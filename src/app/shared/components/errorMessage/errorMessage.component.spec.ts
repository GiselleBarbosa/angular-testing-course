import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ErrorMessageComponent } from './errorMessage.component';

describe('ErrorMessageComponent', () => {
  let component: ErrorMessageComponent;
  let fixture: ComponentFixture<ErrorMessageComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ErrorMessageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve mostrar o erro padrão', () => {
    const messageContainer = fixture.debugElement.query(
      By.css('[data-testid="message-container"]')
    );

    expect(messageContainer.nativeElement.textContent).toEqual(
      'Something went wrong'
    );
  });

  it('deve mostrar o erro customizado', () => {
    component.message = 'Email is already taken';
    fixture.detectChanges();

    const messageContainer = fixture.debugElement.query(
      By.css('[data-testid="message-container"]')
    );
    expect(messageContainer.nativeElement.textContent).toEqual(
      'Email is already taken'
    );
  });
});
