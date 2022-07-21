import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddGodownPage } from './add-godown.page';

describe('AddGodownPage', () => {
  let component: AddGodownPage;
  let fixture: ComponentFixture<AddGodownPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGodownPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddGodownPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
