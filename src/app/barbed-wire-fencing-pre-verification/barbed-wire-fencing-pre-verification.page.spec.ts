import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BarbedWireFencingPreVerificationPage } from './barbed-wire-fencing-pre-verification.page';

describe('BarbedWireFencingPreVerificationPage', () => {
  let component: BarbedWireFencingPreVerificationPage;
  let fixture: ComponentFixture<BarbedWireFencingPreVerificationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarbedWireFencingPreVerificationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BarbedWireFencingPreVerificationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
