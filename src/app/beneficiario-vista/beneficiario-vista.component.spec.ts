import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiarioVistaComponent } from './beneficiario-vista.component';

describe('BeneficiarioVistaComponent', () => {
  let component: BeneficiarioVistaComponent;
  let fixture: ComponentFixture<BeneficiarioVistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeneficiarioVistaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BeneficiarioVistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
