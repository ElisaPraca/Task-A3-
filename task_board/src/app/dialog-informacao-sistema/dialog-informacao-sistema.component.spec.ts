import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogInformacaoSistemaComponent } from './dialog-informacao-sistema.component';

describe('DialogInformacaoSistemaComponent', () => {
  let component: DialogInformacaoSistemaComponent;
  let fixture: ComponentFixture<DialogInformacaoSistemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogInformacaoSistemaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogInformacaoSistemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
