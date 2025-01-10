import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GruposClasesAlumnoComponent } from './grupos-clases-alumno.component';

describe('GruposClasesAlumnoComponent', () => {
  let component: GruposClasesAlumnoComponent;
  let fixture: ComponentFixture<GruposClasesAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GruposClasesAlumnoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GruposClasesAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
