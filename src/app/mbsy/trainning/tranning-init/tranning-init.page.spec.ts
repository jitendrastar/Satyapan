import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TranningInitPage } from './tranning-init.page';

describe('TranningInitPage', () => {
  let component: TranningInitPage;
  let fixture: ComponentFixture<TranningInitPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranningInitPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TranningInitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
