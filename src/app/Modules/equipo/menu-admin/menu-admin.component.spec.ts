import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuAdminComponent2 } from './menu-admin.component';

describe('MenuAdminComponent', () => {
  let component: MenuAdminComponent2;
  let fixture: ComponentFixture<MenuAdminComponent2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuAdminComponent2]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MenuAdminComponent2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
