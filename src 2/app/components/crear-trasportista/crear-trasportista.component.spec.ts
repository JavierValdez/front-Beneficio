import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearTrasportistaComponent } from './crear-trasportista.component';

describe('CrearTrasportistaComponent', () => {
  let component: CrearTrasportistaComponent;
  let fixture: ComponentFixture<CrearTrasportistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearTrasportistaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearTrasportistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
