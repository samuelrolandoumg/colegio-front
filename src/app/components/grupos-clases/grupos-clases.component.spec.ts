import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GruposClasesComponent } from './grupos-clases.component';

describe('GruposClasesComponent', () => {
  let component: GruposClasesComponent;
  let fixture: ComponentFixture<GruposClasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GruposClasesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GruposClasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
