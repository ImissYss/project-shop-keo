import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialBuyComponent } from './tutorial-buy.component';

describe('TutorialBuyComponent', () => {
  let component: TutorialBuyComponent;
  let fixture: ComponentFixture<TutorialBuyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorialBuyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorialBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
