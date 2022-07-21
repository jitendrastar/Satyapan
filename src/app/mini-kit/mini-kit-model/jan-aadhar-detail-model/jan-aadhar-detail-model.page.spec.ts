import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JanAadharDetailModelPage } from './jan-aadhar-detail-model.page';

describe('JanAadharDetailModelPage', () => {
  let component: JanAadharDetailModelPage;
  let fixture: ComponentFixture<JanAadharDetailModelPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JanAadharDetailModelPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JanAadharDetailModelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
