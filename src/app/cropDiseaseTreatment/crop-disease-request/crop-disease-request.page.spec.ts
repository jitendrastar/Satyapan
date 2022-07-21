import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CropDiseaseRequestPage } from './crop-disease-request.page';

describe('CropDiseaseRequestPage', () => {
  let component: CropDiseaseRequestPage;
  let fixture: ComponentFixture<CropDiseaseRequestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CropDiseaseRequestPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CropDiseaseRequestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
