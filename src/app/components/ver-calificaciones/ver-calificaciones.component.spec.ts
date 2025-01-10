import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerCalificacionesComponent } from './ver-calificaciones.component';

describe('VerCalificacionesComponent', () => {
  let component: VerCalificacionesComponent;
  let fixture: ComponentFixture<VerCalificacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerCalificacionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerCalificacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
