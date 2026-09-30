import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CapaDisciplina } from './capa-disciplina';

describe('CapaDisciplina', () => {
  let component: CapaDisciplina;
  let fixture: ComponentFixture<CapaDisciplina>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CapaDisciplina],
    }).compileComponents();

    fixture = TestBed.createComponent(CapaDisciplina);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
