import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpCrearEventoComponent } from './pop-up-crear-evento.component';

describe('PopUpCrearEventoComponent', () => {
  let component: PopUpCrearEventoComponent;
  let fixture: ComponentFixture<PopUpCrearEventoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopUpCrearEventoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopUpCrearEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
