import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorreoCambioContrasenaComponent } from './correo-cambio-contrasena.component';

describe('CorreoCambioContrasenaComponent', () => {
  let component: CorreoCambioContrasenaComponent;
  let fixture: ComponentFixture<CorreoCambioContrasenaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CorreoCambioContrasenaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CorreoCambioContrasenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
