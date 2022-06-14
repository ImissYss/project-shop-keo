import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateProductResultComponent } from './template-product-result.component';

describe('TemplateProductResultComponent', () => {
  let component: TemplateProductResultComponent;
  let fixture: ComponentFixture<TemplateProductResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplateProductResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateProductResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
