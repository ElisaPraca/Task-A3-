import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogManutencaoTaskComponent } from './dialog-manutencao-task.component';

describe('DialogManutencaoTaskComponent', () => {
  let component: DialogManutencaoTaskComponent;
  let fixture: ComponentFixture<DialogManutencaoTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogManutencaoTaskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogManutencaoTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
