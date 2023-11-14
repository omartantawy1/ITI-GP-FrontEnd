import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarWithWorkspaceComponent } from './sidebar-with-workspace.component';

describe('SidebarWithWorkspaceComponent', () => {
  let component: SidebarWithWorkspaceComponent;
  let fixture: ComponentFixture<SidebarWithWorkspaceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarWithWorkspaceComponent]
    });
    fixture = TestBed.createComponent(SidebarWithWorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
