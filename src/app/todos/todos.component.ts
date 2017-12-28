import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';
import { fade, slide } from '../animations';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
  animations: [
    fade,
    slide
  ]
})
export class TodosComponent implements OnInit {
  todosList: Todo[];

  constructor(
    private authService: AuthService,
    private todoService: TodoService) {

  }

  ngOnInit() {
    this.todoService.getToDos()
      .subscribe(todos => {
        this.todosList = todos;
      });
  }

  public newTodo: Todo = new Todo()
  create() {
    this.newTodo._creator = this.authService.currentUser._id;
    //this.newTodo._creator = '123123124125151';
    this.todoService.createTodo(this.newTodo)
      .subscribe((res) => {
        this.todosList.push(res)
        this.newTodo = new Todo();
      })
  }

}
