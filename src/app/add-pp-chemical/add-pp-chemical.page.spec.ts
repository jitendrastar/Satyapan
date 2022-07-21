import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddPpChemicalPage } from './add-pp-chemical.page';

describe('AddPpChemicalPage', () => {
  let component: AddPpChemicalPage;
  let fixture: ComponentFixture<AddPpChemicalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPpChemicalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddPpChemicalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
