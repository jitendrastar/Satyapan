import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MbsyProductAllotmentModelPage } from './product-allotment-model.page';

describe('MbsyProductAllotmentModelPage', () => {
  let component: MbsyProductAllotmentModelPage;
  let fixture: ComponentFixture<MbsyProductAllotmentModelPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MbsyProductAllotmentModelPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MbsyProductAllotmentModelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
