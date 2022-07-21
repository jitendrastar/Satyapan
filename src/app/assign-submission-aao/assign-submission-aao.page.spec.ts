import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AssignSubmissionAaoPage } from './assign-submission-aao.page';

describe('AssignSubmissionAaoPage', () => {
  let component: AssignSubmissionAaoPage;
  let fixture: ComponentFixture<AssignSubmissionAaoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignSubmissionAaoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AssignSubmissionAaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
