import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpDetallesEventoComponent } from './pop-up-detalles-evento.component';

describe('PopUpDetallesEventoComponent', () => {
  let component: PopUpDetallesEventoComponent;
  let fixture: ComponentFixture<PopUpDetallesEventoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopUpDetallesEventoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopUpDetallesEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
