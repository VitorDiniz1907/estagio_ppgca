import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerspectivasModelo } from './perspectivas-modelo';

describe('PerspectivasModelo', () => {
  let component: PerspectivasModelo;
  let fixture: ComponentFixture<PerspectivasModelo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerspectivasModelo],
    }).compileComponents();

    fixture = TestBed.createComponent(PerspectivasModelo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
