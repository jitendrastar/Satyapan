import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AsListPage } from './as-list.page';

describe('AsListPage', () => {
  let component: AsListPage;
  let fixture: ComponentFixture<AsListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
