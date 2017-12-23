import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Todo } from './todo';

import 'rxjs/add/operator/map';

@Injectable()
export class TodoService {

  constructor(private http: HttpClient) { }

  getToDos(): Observable<Todo[]> {
    return this.http.get('/api')
      .map(res => {
        return res["todos"] as Todo[];
      });
  }

  getTodo(id): Observable<Todo> {
    return this.http.get(`/api/${id}`)
      .map(res => res["todo"] as Todo)

  }

  createTodo(todo: Todo): Observable<any> {
    return this.http.post('/api', todo);
  }

  editTodo(todo: Todo) {
    return this.http.put(`/api/${todo._id}`, todo);
  }

  deleteTodo(id: string) {
    return this.http.delete(`/api/${id}`)
      .map(res => {
        return res;
      })
    }



}
