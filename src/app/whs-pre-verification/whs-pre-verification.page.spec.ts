import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WhsPreVerificationPage } from './whs-pre-verification.page';

describe('WhsPreVerificationPage', () => {
  let component: WhsPreVerificationPage;
  let fixture: ComponentFixture<WhsPreVerificationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhsPreVerificationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WhsPreVerificationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
