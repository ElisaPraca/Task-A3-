import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Task } from '../app.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  /** URL base da API RESTful. */
  protected baseUrl: string = environment.apiUrl;

  constructor(protected http: HttpClient) { }

  /**
   * Método para buscar todos os recursos da entidade.
   * @returns Um Observable que emite um array dos recursos.
   */
  getAll(): Observable<Task[]> {
    const url = `${this.baseUrl}tasks`;
    return this.http.get<Task[]>(url);
  }

  /**
   * Método para criar um novo recurso.
   * @param resource O recurso a ser criado.
   * @returns Um Observable que emite o recurso criado.
   */
  create(resource: Task): Observable<Task> {
    const url = `${this.baseUrl}tasks`;
    return this.http.post<Task>(url, resource);
  }

  /**
   * Método para atualizar um recurso existente.
   * @param id O ID do recurso a ser atualizado.
   * @param resource O recurso atualizado.
   * @returns Um Observable que emite o recurso atualizado.
   */
  update(id: number, resource: Task): Observable<Task> {
    const url = `${this.baseUrl}tasks/${id}`;
    return this.http.put<Task>(url, resource);
  }

  /**
   * Método para excluir um recurso pelo seu ID.
   * @param id O ID do recurso a ser excluído.
   * @returns Um Observable que emite um valor vazio quando a exclusão é bem-sucedida.
   */
  delete(id: number): Observable<void> {
    const url = `${this.baseUrl}tasks/${id}`;
    return this.http.delete<void>(url);
  }
}
