import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddParentCatComponent } from './add-parent-cat.component';

describe('AddParentCatComponent', () => {
  let component: AddParentCatComponent;
  let fixture: ComponentFixture<AddParentCatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddParentCatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddParentCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
