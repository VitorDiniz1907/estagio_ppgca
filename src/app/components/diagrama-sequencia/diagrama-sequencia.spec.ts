import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DiagramaSequencia } from './diagrama-sequencia';

describe('DiagramaSequencia', () => {
  let component: DiagramaSequencia;
  let fixture: ComponentFixture<DiagramaSequencia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiagramaSequencia],
    }).compileComponents();

    fixture = TestBed.createComponent(DiagramaSequencia);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
