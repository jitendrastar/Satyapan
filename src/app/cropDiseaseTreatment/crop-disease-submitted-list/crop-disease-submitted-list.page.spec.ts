import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CropDiseaseSubmittedListPage } from './crop-disease-submitted-list.page';

describe('CropDiseaseSubmittedListPage', () => {
  let component: CropDiseaseSubmittedListPage;
  let fixture: ComponentFixture<CropDiseaseSubmittedListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CropDiseaseSubmittedListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CropDiseaseSubmittedListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
