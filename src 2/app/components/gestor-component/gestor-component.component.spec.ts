import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestorComponentComponent } from './gestor-component.component';

describe('GestorComponentComponent', () => {
  let component: GestorComponentComponent;
  let fixture: ComponentFixture<GestorComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestorComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestorComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
