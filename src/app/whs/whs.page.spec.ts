import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WhsPage } from './whs.page';

describe('WhsPage', () => {
  let component: WhsPage;
  let fixture: ComponentFixture<WhsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WhsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
