import { ChangeDetectionStrategy, Component, EventEmitter, inject, OnInit, signal } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { TaskService } from './services/task.service';
import { catchError, EMPTY, Observable, switchMap, tap } from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TableComponent } from './components/table/table.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { DialogService } from './components/dialog/dialog.service';
import { enumDialogType } from './enums/enum-dialog-type';
import { DialogManutencaoTaskComponent } from './dialog-manutencao-task/dialog-manutencao-task.component';
import { TaskQueueService } from './services/task.queue.service';
import { TaskStackService } from './services/task.stack.service';
import { DialogInformacaoSistemaComponent } from './dialog-informacao-sistema/dialog-informacao-sistema.component';
export interface Task {
  id: number;
  description: string;
  title: string;
  createdAt: string;
}

@Component({
  selector: 'app-root',
  imports: [MatGridListModule, MatCardModule, MatListModule, MatSnackBarModule, TableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  #taskService: TaskService = inject(TaskService);
  #taskQueueService: TaskQueueService = inject(TaskQueueService);
  #taskStackService: TaskStackService = inject(TaskStackService);
  #snackBar: MatSnackBar = inject(MatSnackBar);
  #dialogService: DialogService = inject(DialogService);

  tasks = signal<Task[]>([]);
  tasksQueue = signal<Task[]>([]);
  tasksStack = signal<Task[]>([]);

  ngOnInit(): void {
    this.#dialogService.getDialogEspecifico(DialogInformacaoSistemaComponent, enumDialogType.INFO, true
    );
    this.fetchData();
  }

  fetchData(): void {
    this.#taskService.getAll().subscribe((t: Task[]) => this.tasks.set(t));
    this.#taskQueueService.getAll().subscribe((t: Task[]) => this.tasksQueue.set(t));
    this.#taskStackService.getAll().subscribe((t: Task[]) => this.tasksStack.set(t));
  }

  /** Exclui uma task após a confirmação do dialog */
  delete(task: Task): void {
    this.#dialogService.getDialog(enumDialogType.CONFIRM, 'Deseja excluir o registro?')
      .pipe(
        switchMap((confirmed: boolean) => {
          if (confirmed) {
            // Usuário confirmou a exclusão, executa a exclusão
            return this.#taskService.delete(task.id).pipe(
              tap(() => {
                // Exibe mensagem de sucesso
                this.#snackBar.open('Tarefa excluída com sucesso!', 'Fechar', {
                  duration: 3000,
                  panelClass: ['snack-success'],
                });
              }),
              catchError((error) => {
                // Exibe mensagem de erro em caso de falha
                this.#snackBar.open('Erro ao excluir a tarefa!', 'Fechar', {
                  duration: 3000,
                  panelClass: ['snack-error'],
                });
                // Retorna um observable vazio para evitar interrupção
                return EMPTY;
              })
            );
          }
          return EMPTY; // Retorna um observable vazio
        })
      )
      .subscribe({
        next: () => {
          this.fetchData();
        },
        error: (err) => {
          console.error('Erro durante a exclusão:', err);
        }
      });
  }

  createTask(): void {
    this.#dialogService.getDialogEspecifico(DialogManutencaoTaskComponent,
      { data: null, action: 'Cadastrar' }
    ).subscribe((result: boolean | Task) => {
      if (result && typeof result === 'object') {
        // Trata como uma tarefa retornada
        if (result) {
          this.#snackBar.open('Task criada com sucesso!', 'Fechar', {
            duration: 3000,
            panelClass: ['snack-success'],
          });
          this.fetchData();
        } else {
          this.#snackBar.open('Falha ao criar a task.', 'Fechar', {
            duration: 3000,
            panelClass: ['snack-error'],
          });
        }
      }
    });
  }

  editTask(task: Task): void {
    this.#dialogService.getDialogEspecifico(DialogManutencaoTaskComponent,
      { data: task, action: 'Editar' }
    ).subscribe((result: boolean | Task) => {
      if (result && typeof result === 'object') {
        // Trata como uma tarefa retornada
        if (result) {
          this.#snackBar.open('Task editada com sucesso!', 'Fechar', {
            duration: 3000,
            panelClass: ['snack-success'],
          });
          this.fetchData();
        } else {
          this.#snackBar.open('Falha ao criar a task.', 'Fechar', {
            duration: 3000,
            panelClass: ['snack-error'],
          });
        }
      }
    });
  }

  removeTaskFromQueue(): void {
      this.#taskQueueService.remove().subscribe({
        next: (result) => {
          this.#snackBar.open('Task removida com sucesso!', 'Fechar', {
            duration: 3000,
            panelClass: ['snack-success'],
          });
        },
        error: (error) => {
          this.#snackBar.open('Falha ao remover a task.', 'Fechar', {
            duration: 3000,
            panelClass: ['snack-error'],
          });
        },
      });
    this.fetchData();
  }

  removeTaskFromStack(): void {
      this.#taskStackService.remove().subscribe({
        next: (result) => {
          this.#snackBar.open('Task removida com sucesso!', 'Fechar', {
            duration: 3000,
            panelClass: ['snack-success'],
          });
        },
        error: (error) => {
          this.#snackBar.open('Falha ao remover a task.', 'Fechar', {
            duration: 3000,
            panelClass: ['snack-error'],
          });
        },
      });
    this.fetchData();
  }
}
