import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BarbedWireFencingPage } from './barbed-wire-fencing.page';

describe('BarbedWireFencingPage', () => {
  let component: BarbedWireFencingPage;
  let fixture: ComponentFixture<BarbedWireFencingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarbedWireFencingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BarbedWireFencingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
