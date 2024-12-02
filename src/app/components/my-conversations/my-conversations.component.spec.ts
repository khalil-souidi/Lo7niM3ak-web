import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyConversationsComponent } from './my-conversations.component';

describe('MyConversationsComponent', () => {
  let component: MyConversationsComponent;
  let fixture: ComponentFixture<MyConversationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyConversationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyConversationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
