import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearTrasporteComponent } from './crear-trasporte.component';

describe('CrearTrasporteComponent', () => {
  let component: CrearTrasporteComponent;
  let fixture: ComponentFixture<CrearTrasporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearTrasporteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearTrasporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
