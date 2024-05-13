import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoClubComponent } from './info-club.component';

describe('InfoClubComponent', () => {
  let component: InfoClubComponent;
  let fixture: ComponentFixture<InfoClubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InfoClubComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
