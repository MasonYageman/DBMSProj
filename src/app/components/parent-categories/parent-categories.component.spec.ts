import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentCategoriesComponent } from './parent-categories.component';

describe('ParentCategoriesComponent', () => {
  let component: ParentCategoriesComponent;
  let fixture: ComponentFixture<ParentCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParentCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
