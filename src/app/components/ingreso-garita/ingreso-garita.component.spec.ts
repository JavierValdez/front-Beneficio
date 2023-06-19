import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoGaritaComponent } from './ingreso-garita.component';

describe('IngresoGaritaComponent', () => {
  let component: IngresoGaritaComponent;
  let fixture: ComponentFixture<IngresoGaritaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngresoGaritaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngresoGaritaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
