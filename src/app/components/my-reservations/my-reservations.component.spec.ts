import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyReservationComponent } from './my-reservations.component';

describe('MyReservationsComponent', () => {
  let component: MyReservationComponent;
  let fixture: ComponentFixture<MyReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyReservationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
