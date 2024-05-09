import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuJugadoresComponent2 } from './menu-jugadores.component';

describe('MenuJugadoresComponent', () => {
  let component: MenuJugadoresComponent2;
  let fixture: ComponentFixture<MenuJugadoresComponent2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuJugadoresComponent2]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MenuJugadoresComponent2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
