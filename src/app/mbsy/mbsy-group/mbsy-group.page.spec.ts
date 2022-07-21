import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MbsyGroupPage } from './mbsy-group.page';

describe('MbsyGroupPage', () => {
  let component: MbsyGroupPage;
  let fixture: ComponentFixture<MbsyGroupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MbsyGroupPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MbsyGroupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
