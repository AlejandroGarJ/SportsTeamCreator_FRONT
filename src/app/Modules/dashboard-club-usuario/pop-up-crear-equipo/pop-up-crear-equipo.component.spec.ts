import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpCrearEquipoComponent } from './pop-up-crear-equipo.component';

describe('PopUpCrearEquipoComponent', () => {
  let component: PopUpCrearEquipoComponent;
  let fixture: ComponentFixture<PopUpCrearEquipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopUpCrearEquipoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopUpCrearEquipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
