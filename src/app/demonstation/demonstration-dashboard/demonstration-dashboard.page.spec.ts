import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DemonstrationDashboardPage } from './demonstration-dashboard.page';

describe('DemonstrationDashboardPage', () => {
  let component: DemonstrationDashboardPage;
  let fixture: ComponentFixture<DemonstrationDashboardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemonstrationDashboardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DemonstrationDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
