import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdReactiveFormComponent } from './ad-reactive-form.component';

describe('AdReactiveFormComponent', () => {
  let component: AdReactiveFormComponent;
  let fixture: ComponentFixture<AdReactiveFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdReactiveFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdReactiveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
