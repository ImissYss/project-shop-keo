import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixContentComponent } from './fix-content.component';

describe('FixContentComponent', () => {
  let component: FixContentComponent;
  let fixture: ComponentFixture<FixContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FixContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FixContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
