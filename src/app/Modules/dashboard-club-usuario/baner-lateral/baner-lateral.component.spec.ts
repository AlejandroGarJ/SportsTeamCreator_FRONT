import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BanerLateralComponent } from './baner-lateral.component';

describe('BanerLateralComponent', () => {
  let component: BanerLateralComponent;
  let fixture: ComponentFixture<BanerLateralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BanerLateralComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BanerLateralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
