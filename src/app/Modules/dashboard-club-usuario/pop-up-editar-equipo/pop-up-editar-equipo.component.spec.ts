import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpEditarEquipoComponent } from './pop-up-editar-equipo.component';

describe('PopUpEditarEquipoComponent', () => {
  let component: PopUpEditarEquipoComponent;
  let fixture: ComponentFixture<PopUpEditarEquipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopUpEditarEquipoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopUpEditarEquipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
