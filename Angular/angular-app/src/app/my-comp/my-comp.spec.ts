import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyComp } from './my-comp';

describe('MyComp', () => {
  let component: MyComp;
  let fixture: ComponentFixture<MyComp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyComp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyComp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
