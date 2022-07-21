import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DemonstrationBeneficiaryPage } from './demonstration-beneficiary.page';

describe('DemonstrationBeneficiaryPage', () => {
  let component: DemonstrationBeneficiaryPage;
  let fixture: ComponentFixture<DemonstrationBeneficiaryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemonstrationBeneficiaryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DemonstrationBeneficiaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
