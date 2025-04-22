import { Component, inject, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user-interface';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [UsersService],
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  private usersService = inject(UsersService);

  userName!: string;
  usersList: User[] = [];

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    if (localStorage.getItem('users')) {
      this.usersService.users = JSON.parse(localStorage.getItem('users')!);
    }
    this.usersList = this.usersService.getUsers();
  }

  addUser() {
    this.usersService.addUser({ id: Math.random(), name: this.userName });

    this.loadUsers();

    this.userName = '';
  }

  removeUser(userId: number) {
    this.usersService.removeUser(userId);

    this.loadUsers();
  }

  editUser(userId: number) {
    const user = this.usersService.getUserById(userId);
    if (user) {
      this.userName = user.name;
      this.removeUser(userId);
    }

    this.loadUsers();
  }
}
