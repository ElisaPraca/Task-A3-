import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmeDeleteDialogComponent } from './dialog.component';

describe('ConfirmeDeleteDialogComponent', () => {
  let component: ConfirmeDeleteDialogComponent;
  let fixture: ComponentFixture<ConfirmeDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmeDeleteDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmeDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
