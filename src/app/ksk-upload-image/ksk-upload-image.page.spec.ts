import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { KskUploadImagePage } from './ksk-upload-image.page';

describe('KskUploadImagePage', () => {
  let component: KskUploadImagePage;
  let fixture: ComponentFixture<KskUploadImagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KskUploadImagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(KskUploadImagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
