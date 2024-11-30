import { Component, inject, Inject, model, signal } from '@angular/core';
import { Task } from '../app.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-dialog-manutencao-task',
  imports: [MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './dialog-manutencao-task.component.html',
  styleUrl: './dialog-manutencao-task.component.scss'
})
export class DialogManutencaoTaskComponent {

  task = model.required<Task>();
  action = signal<String | null>(null);
  form?: FormGroup;

  #taskService: TaskService = inject(TaskService);

  constructor(
    public dialogRef: MatDialogRef<DialogManutencaoTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { data: { data: Task; action: string } }
  ) {

  }

  ngOnInit(): void {
    // Carrega os dados da task pelo dialog
    this.task.set(this.data.data.data);
    // Seta a action no formulário
    this.action.set(this.data.data.action);
    // Inicializa o formulário
    this.initForm();
  }

  initForm(): void {
    // Inicializa o formulário com os dados recebidos
    this.form = new FormGroup({
      title: new FormControl(this.data.data.data?.title || '', { nonNullable: true }),
      description: new FormControl(this.data.data.data?.description || '', { nonNullable: true }),
    });
  }

  onConfirm(): void {
    if (this.form!.valid) {
      if (this.action() === 'Cadastrar') {
        this.#taskService.create(this.form?.getRawValue()).subscribe((response) => {
          this.dialogRef.close(response);
        });
      } else {
        this.#taskService.update(this.task().id, this.form?.getRawValue()).subscribe((response) => {
          this.dialogRef.close(response);
        });
      }
      this.action.set(null);
    }
  }
}