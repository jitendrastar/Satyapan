import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OnionStoragePostVerificationPage } from './onion-storage-post-verification.page';

describe('OnionStoragePostVerificationPage', () => {
  let component: OnionStoragePostVerificationPage;
  let fixture: ComponentFixture<OnionStoragePostVerificationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnionStoragePostVerificationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OnionStoragePostVerificationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
