import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisorQRComponent } from './visor-qr.component';

describe('VisorQRComponent', () => {
  let component: VisorQRComponent;
  let fixture: ComponentFixture<VisorQRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisorQRComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisorQRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
