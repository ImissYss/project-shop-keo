import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyAdminComponent } from './policy-admin.component';

describe('PolicyAdminComponent', () => {
  let component: PolicyAdminComponent;
  let fixture: ComponentFixture<PolicyAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolicyAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
