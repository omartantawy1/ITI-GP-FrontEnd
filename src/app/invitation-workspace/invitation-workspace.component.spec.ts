import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitationWorkspaceComponent } from './invitation-workspace.component';

describe('InvitationWorkspaceComponent', () => {
  let component: InvitationWorkspaceComponent;
  let fixture: ComponentFixture<InvitationWorkspaceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvitationWorkspaceComponent]
    });
    fixture = TestBed.createComponent(InvitationWorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
