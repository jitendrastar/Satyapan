import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PolyHousePostVerificationPage } from './poly-house-post-verification.page';

describe('PolyHousePostVerificationPage', () => {
  let component: PolyHousePostVerificationPage;
  let fixture: ComponentFixture<PolyHousePostVerificationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolyHousePostVerificationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PolyHousePostVerificationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
