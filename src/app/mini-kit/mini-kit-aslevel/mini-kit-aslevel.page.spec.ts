import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MiniKitAslevelPage } from './mini-kit-aslevel.page';

describe('MiniKitAslevelPage', () => {
  let component: MiniKitAslevelPage;
  let fixture: ComponentFixture<MiniKitAslevelPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiniKitAslevelPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MiniKitAslevelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
