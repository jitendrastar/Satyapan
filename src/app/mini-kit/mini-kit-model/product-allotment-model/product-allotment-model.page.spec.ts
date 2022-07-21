import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProductAllotmentModelPage } from './product-allotment-model.page';

describe('ProductAllotmentModelPage', () => {
  let component: ProductAllotmentModelPage;
  let fixture: ComponentFixture<ProductAllotmentModelPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductAllotmentModelPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductAllotmentModelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
