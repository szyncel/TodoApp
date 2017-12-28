import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Todo } from './todo';

import 'rxjs/add/operator/map';


@Injectable()
export class TodoService {

  constructor(private http: HttpClient) { }


  createAuthorizationHeader(headers: Headers) {
    headers.append('x-auth', 'trasdasda');
  }

  getToDos(): Observable<Todo[]> {
    let token = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('x-auth', token);

    return this.http.get('/api', {
      headers: headers
    })
      .map(res => {
        return res["todos"] as Todo[];
      });
  }

  getTodo(id): Observable<Todo> {
    return this.http.get(`/api/${id}`)
      .map(res => res["todo"] as Todo)

  }

  createTodo(todo: Todo): Observable<any> {
    let token = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('x-auth', token);

    return this.http.post('/api', todo,{headers:headers});
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
