import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExemploCodigo } from './exemplo-codigo';

describe('ExemploCodigo', () => {
  let component: ExemploCodigo;
  let fixture: ComponentFixture<ExemploCodigo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExemploCodigo],
    }).compileComponents();

    fixture = TestBed.createComponent(ExemploCodigo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
