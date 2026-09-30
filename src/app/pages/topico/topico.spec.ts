import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Topico } from './topico';

describe('Topico', () => {
  let component: Topico;
  let fixture: ComponentFixture<Topico>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Topico],
    }).compileComponents();

    fixture = TestBed.createComponent(Topico);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
