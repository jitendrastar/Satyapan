import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WheatherUpdateImagePage } from './wheather-update-image.page';

describe('WheatherUpdateImagePage', () => {
  let component: WheatherUpdateImagePage;
  let fixture: ComponentFixture<WheatherUpdateImagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WheatherUpdateImagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WheatherUpdateImagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
