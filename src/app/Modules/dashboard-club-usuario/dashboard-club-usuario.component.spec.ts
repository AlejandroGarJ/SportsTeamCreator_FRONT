import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardClubUsuarioComponent } from './dashboard-club-usuario.component';

describe('DashboardClubUsuarioComponent', () => {
  let component: DashboardClubUsuarioComponent;
  let fixture: ComponentFixture<DashboardClubUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardClubUsuarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardClubUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
