import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PalyersComponent } from './palyers.component';

describe('PalyersComponent', () => {
  let component: PalyersComponent;
  let fixture: ComponentFixture<PalyersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PalyersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PalyersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
