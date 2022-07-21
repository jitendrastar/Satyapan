import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MbsyCalAllotmentPage } from './mbsy-cal-allotment.page';

describe('MbsyCalAllotmentPage', () => {
  let component: MbsyCalAllotmentPage;
  let fixture: ComponentFixture<MbsyCalAllotmentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MbsyCalAllotmentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MbsyCalAllotmentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
