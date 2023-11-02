import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupCreateWorkspaceComponent } from './popup-create-workspace.component';

describe('PopupCreateWorkspaceComponent', () => {
  let component: PopupCreateWorkspaceComponent;
  let fixture: ComponentFixture<PopupCreateWorkspaceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopupCreateWorkspaceComponent]
    });
    fixture = TestBed.createComponent(PopupCreateWorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
