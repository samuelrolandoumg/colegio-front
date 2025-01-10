import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarAlumnoGrupoComponent } from './agregar-alumno-grupo.component';

describe('AgregarAlumnoGrupoComponent', () => {
  let component: AgregarAlumnoGrupoComponent;
  let fixture: ComponentFixture<AgregarAlumnoGrupoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarAlumnoGrupoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarAlumnoGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
