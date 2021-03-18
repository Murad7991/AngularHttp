import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
export interface Todo {
  completed: boolean;
  title: string;
  id?: number;
}
@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor(private http: HttpClient) { }
  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>('https://jsonplaceholder.typicode.com/todos', todo);
  }
  fetchTodo(): Observable<Todo[]> {
    return this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos', {
      params : new HttpParams().set('_limit', '3')
    })
        .pipe(catchError ( err => {
          console.log(err.message);
          return throwError(err.message);
        }));
  }
  deleteTodo(id: number): Observable<any> {
    return this.http.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
  }
  completedTodo(id: number): Observable<Todo> {
    return this.http.put<Todo>(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      completed: true
    });
  }
}
