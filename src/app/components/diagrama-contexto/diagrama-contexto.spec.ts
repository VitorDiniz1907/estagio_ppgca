import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DiagramaContexto } from './diagrama-contexto';

describe('DiagramaContexto', () => {
  let component: DiagramaContexto;
  let fixture: ComponentFixture<DiagramaContexto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiagramaContexto],
    }).compileComponents();

    fixture = TestBed.createComponent(DiagramaContexto);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
