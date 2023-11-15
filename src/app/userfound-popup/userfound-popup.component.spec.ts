import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserfoundPopupComponent } from './userfound-popup.component';

describe('UserfoundPopupComponent', () => {
  let component: UserfoundPopupComponent;
  let fixture: ComponentFixture<UserfoundPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserfoundPopupComponent]
    });
    fixture = TestBed.createComponent(UserfoundPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
