import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlasticMulchPostVerificationPage } from './plastic-mulch-post-verification.page';

describe('PlasticMulchPostVerificationPage', () => {
  let component: PlasticMulchPostVerificationPage;
  let fixture: ComponentFixture<PlasticMulchPostVerificationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlasticMulchPostVerificationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PlasticMulchPostVerificationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
