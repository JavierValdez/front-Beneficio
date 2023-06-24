import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroBeneficioComponent } from './registro-beneficio.component';

describe('RegistroBeneficioComponent', () => {
  let component: RegistroBeneficioComponent;
  let fixture: ComponentFixture<RegistroBeneficioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroBeneficioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroBeneficioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
