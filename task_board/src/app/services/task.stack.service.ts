import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Task } from '../app.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskStackService {
  /** URL base da API RESTful. */
  protected baseUrl: string = environment.apiUrl;

  constructor(protected http: HttpClient) { }

  /**
   * Método para buscar todos os recursos da entidade.
   * @returns Um Observable que emite um array dos recursos.
   */
  getAll(): Observable<Task[]> {
    const url = `${this.baseUrl}stack`;
    return this.http.get<Task[]>(url);
  }

  /**
   * Método para excluir um recurso pelo seu ID.
   * @param id O ID do recurso a ser excluído.
   * @returns Um Observable que emite um valor vazio quando a exclusão é bem-sucedida.
   */
  remove(): Observable<void> {
    const url = `${this.baseUrl}stack`;
    return this.http.delete<void>(url);
  }
}
