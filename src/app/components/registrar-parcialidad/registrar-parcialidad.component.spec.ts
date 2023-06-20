import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarParcialidadComponent } from './registrar-parcialidad.component';

describe('RegistrarParcialidadComponent', () => {
  let component: RegistrarParcialidadComponent;
  let fixture: ComponentFixture<RegistrarParcialidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarParcialidadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarParcialidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
