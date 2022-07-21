import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MbsyFarmerListPage } from './mbsy-farmer-list.page';

describe('MbsyFarmerListPage', () => {
  let component: MbsyFarmerListPage;
  let fixture: ComponentFixture<MbsyFarmerListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MbsyFarmerListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MbsyFarmerListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
