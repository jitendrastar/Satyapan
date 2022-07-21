import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DemonstrationAslevelPage } from './demonstration-aslevel.page';

describe('DemonstrationAslevelPage', () => {
  let component: DemonstrationAslevelPage;
  let fixture: ComponentFixture<DemonstrationAslevelPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemonstrationAslevelPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DemonstrationAslevelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
