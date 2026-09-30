import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DiagramaCasoDeUso } from './diagrama-caso-de-uso';

describe('DiagramaCasoDeUso', () => {
  let component: DiagramaCasoDeUso;
  let fixture: ComponentFixture<DiagramaCasoDeUso>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiagramaCasoDeUso],
    }).compileComponents();

    fixture = TestBed.createComponent(DiagramaCasoDeUso);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
