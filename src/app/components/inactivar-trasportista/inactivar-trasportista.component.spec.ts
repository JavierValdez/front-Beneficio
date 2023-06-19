import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InactivarTrasportistaComponent } from './inactivar-trasportista.component';

describe('InactivarTrasportistaComponent', () => {
  let component: InactivarTrasportistaComponent;
  let fixture: ComponentFixture<InactivarTrasportistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InactivarTrasportistaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InactivarTrasportistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
