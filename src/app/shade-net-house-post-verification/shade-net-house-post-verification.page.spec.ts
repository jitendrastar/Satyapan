import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ShadeNetHousePostVerificationPage } from './shade-net-house-post-verification.page';

describe('ShadeNetHousePostVerificationPage', () => {
  let component: ShadeNetHousePostVerificationPage;
  let fixture: ComponentFixture<ShadeNetHousePostVerificationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShadeNetHousePostVerificationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ShadeNetHousePostVerificationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
