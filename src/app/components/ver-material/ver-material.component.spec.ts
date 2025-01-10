import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerMaterialComponent } from './ver-material.component';

describe('VerMaterialComponent', () => {
  let component: VerMaterialComponent;
  let fixture: ComponentFixture<VerMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerMaterialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
