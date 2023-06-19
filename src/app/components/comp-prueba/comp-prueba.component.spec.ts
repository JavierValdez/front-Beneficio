import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompPruebaComponent } from './comp-prueba.component';

describe('CompPruebaComponent', () => {
  let component: CompPruebaComponent;
  let fixture: ComponentFixture<CompPruebaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompPruebaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompPruebaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
