import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MbsyFinalAllotmentPage } from './mbsy-final-allotment.page';

describe('MbsyFinalAllotmentPage', () => {
  let component: MbsyFinalAllotmentPage;
  let fixture: ComponentFixture<MbsyFinalAllotmentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MbsyFinalAllotmentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MbsyFinalAllotmentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
