import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PpChemicalListPage } from './pp-chemical-list.page';

describe('PpChemicalListPage', () => {
  let component: PpChemicalListPage;
  let fixture: ComponentFixture<PpChemicalListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PpChemicalListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PpChemicalListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
