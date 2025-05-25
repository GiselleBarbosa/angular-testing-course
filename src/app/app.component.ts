import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UsersService } from './shared/services/users.service';
import { UserListComponent } from './views/user-list/user-list.component';
import { TodosComponent } from './todos/todos.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TodosComponent, HttpClientModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [UsersService],
})
export class AppComponent {}
