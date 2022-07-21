import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DemonstrationSowingMemberListPage } from './demonstration-sowing-member-list.page';

describe('DemonstrationSowingMemberListPage', () => {
  let component: DemonstrationSowingMemberListPage;
  let fixture: ComponentFixture<DemonstrationSowingMemberListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemonstrationSowingMemberListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DemonstrationSowingMemberListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
