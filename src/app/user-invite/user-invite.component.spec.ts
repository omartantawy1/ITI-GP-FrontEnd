import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInviteComponent } from './user-invite.component';

describe('UserInviteComponent', () => {
  let component: UserInviteComponent;
  let fixture: ComponentFixture<UserInviteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserInviteComponent]
    });
    fixture = TestBed.createComponent(UserInviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
