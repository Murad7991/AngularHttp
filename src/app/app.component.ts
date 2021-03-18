import {Component, OnInit} from '@angular/core'
import {HttpClient} from '@angular/common/http';
import {Todo, TodosService} from './todos.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  todos: Todo[] = [];
  postTitle: '';
  error = '';
  constructor(private todosService: TodosService) {
  }
  ngOnInit() {
    this.fetchTodo();
  }
  addTodo() {
    this.todosService.addTodo({
    title: this.postTitle,
    completed: false
  }).subscribe( response => {
      this.todos.push(response);
      this.postTitle = '';
  });
  }

  fetchTodo() {
    this.todosService.fetchTodo().subscribe( response => {
      this.todos = response;
    }, error => {
      this.error = error.message;
    });
  }
  deleteTodo(id: number) {
    this.todosService.deleteTodo(id).subscribe( () => {
      this.todos = this.todos.filter(p => p.id !== id);
    });
  }
  completedTodo(id: number) {
    this.todosService.completedTodo(id).subscribe( todo => {
      this.todos.find(p => p.id === todo.id).completed = true;
    });
  }
}
