import { Component } from '@angular/core';
import { DialogComponent } from '../components/dialog/dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dialog-informacao-sistema',
  imports: [MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './dialog-informacao-sistema.component.html',
  styleUrl: './dialog-informacao-sistema.component.scss'
})
export class DialogInformacaoSistemaComponent extends DialogComponent {

}
