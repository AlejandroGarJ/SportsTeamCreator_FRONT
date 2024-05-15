import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderMinimalistaComponent } from './loader-minimalista.component';

describe('LoaderMinimalistaComponent', () => {
  let component: LoaderMinimalistaComponent;
  let fixture: ComponentFixture<LoaderMinimalistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoaderMinimalistaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoaderMinimalistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
