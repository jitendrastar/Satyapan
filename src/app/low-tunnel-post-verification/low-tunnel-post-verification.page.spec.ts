import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LowTunnelPostVerificationPage } from './low-tunnel-post-verification.page';

describe('LowTunnelPostVerificationPage', () => {
  let component: LowTunnelPostVerificationPage;
  let fixture: ComponentFixture<LowTunnelPostVerificationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LowTunnelPostVerificationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LowTunnelPostVerificationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
