import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todosList: Todo[];

  constructor(private todoService: TodoService) {

  }

  ngOnInit() {
    this.todoService.getToDos()
      .subscribe(todos => {
        this.todosList = todos;
      });
  }

  public newTodo: Todo = new Todo()
  create() {
    this.todoService.createTodo(this.newTodo)
      .subscribe((res) => {
        this.todosList.push(res)
        this.newTodo = new Todo();
      })
  }

}
