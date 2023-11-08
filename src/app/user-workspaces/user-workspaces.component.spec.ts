import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserWorkspacesComponent } from './user-workspaces.component';

describe('UserWorkspacesComponent', () => {
  let component: UserWorkspacesComponent;
  let fixture: ComponentFixture<UserWorkspacesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserWorkspacesComponent]
    });
    fixture = TestBed.createComponent(UserWorkspacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
