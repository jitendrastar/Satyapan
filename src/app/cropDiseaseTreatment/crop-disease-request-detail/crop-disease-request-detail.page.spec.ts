import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CropDiseaseRequestDetailPage } from './crop-disease-request-detail.page';

describe('CropDiseaseRequestDetailPage', () => {
  let component: CropDiseaseRequestDetailPage;
  let fixture: ComponentFixture<CropDiseaseRequestDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CropDiseaseRequestDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CropDiseaseRequestDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
