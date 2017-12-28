import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { fade, slide, slideLeft } from '../animations';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css'],
  animations: [
    fade,
    slide,
    slideLeft
  ]
})
export class TodoDetailComponent implements OnInit {
  todo: Todo;

  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getHero();
  }

  getHero(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.todoService.getTodo(id)
      .subscribe(todo => {
        return this.todo = todo;
      });
  }

  editTodo(todo: Todo) {
    this.todoService.editTodo(todo)
      .subscribe(res => {
        console.log('Success');
      }, err => {
        console.log('Error');
      })
  }

  deleteTodo(todo: Todo) {
    this.todoService.deleteTodo(todo._id)
      .subscribe(res => {
        console.log('Usunięto');
        this.goBack();
      }, err => {
        console.log('Nie usunięto');
      })
  }

  goBack() {
    this.location.back();
  }

}
