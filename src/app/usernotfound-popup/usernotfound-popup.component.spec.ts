import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsernotfoundPopupComponent } from './usernotfound-popup.component';

describe('UsernotfoundPopupComponent', () => {
  let component: UsernotfoundPopupComponent;
  let fixture: ComponentFixture<UsernotfoundPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsernotfoundPopupComponent]
    });
    fixture = TestBed.createComponent(UsernotfoundPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
