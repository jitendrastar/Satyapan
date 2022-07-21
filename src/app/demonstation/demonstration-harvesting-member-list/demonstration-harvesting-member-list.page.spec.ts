import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DemonstrationHarvestingMemberListPage } from './demonstration-harvesting-member-list.page';

describe('DemonstrationHarvestingMemberListPage', () => {
  let component: DemonstrationHarvestingMemberListPage;
  let fixture: ComponentFixture<DemonstrationHarvestingMemberListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemonstrationHarvestingMemberListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DemonstrationHarvestingMemberListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
