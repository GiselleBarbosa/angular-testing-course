import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from './services/users.service';
import { UserListComponent } from './components/user-list/user-list.component';
import { User } from './models/user-interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, UserListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [UsersService],
})
export class AppComponent {
  constructor(private usersService: UsersService) {}

  addUser(user: User) {
    this.usersService.addUser(user);
  }

  removeUser(userId: number) {
    this.usersService.removeUser(userId);
  }

  getUsers() {
    return this.usersService.getUsers();
  }

  getUserById(userId: number) {
    return this.usersService.getUserById(userId);
  }

  updateUser(userId: number, updatedUser: User) {
    this.usersService.updateUser(userId, updatedUser);
  }

  getUsersCount() {
    return this.usersService.getUsersCount();
  }
}
