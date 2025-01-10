import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisarTareaComponent } from './revisar-tarea.component';

describe('RevisarTareaComponent', () => {
  let component: RevisarTareaComponent;
  let fixture: ComponentFixture<RevisarTareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RevisarTareaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevisarTareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
