import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuJugadoresComponent } from './menu-jugadores.component';

describe('MenuJugadoresComponent', () => {
  let component: MenuJugadoresComponent;
  let fixture: ComponentFixture<MenuJugadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuJugadoresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuJugadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
