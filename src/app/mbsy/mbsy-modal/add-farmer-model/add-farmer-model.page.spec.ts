import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddFarmerModelPage } from './add-farmer-model.page';

describe('AddFarmerModelPage', () => {
  let component: AddFarmerModelPage;
  let fixture: ComponentFixture<AddFarmerModelPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFarmerModelPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddFarmerModelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
