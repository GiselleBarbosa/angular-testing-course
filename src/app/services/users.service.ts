import { Injectable } from '@angular/core';
import { User } from '../models/user-interface';

@Injectable()
export class UsersService {
  users: User[] = [];

  addUser(user: User) {
    this.users.push(user);
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  removeUser(userId: number) {
    this.users = this.users.filter((user) => user.id !== userId);
    localStorage.setItem('users', JSON.stringify(this.users));
    console.log('User removed:', userId);
  }

  getUsers(): User[] {
    return this.users;
  }
  
  getUserById(userId: number): User | undefined {
    return this.users.find((user) => user.id === userId);
  }

  updateUser(userId: number, updatedUser: User) {
    const userIndex = this.users.findIndex((user) => user.id === userId);
    if (userIndex !== -1) {
      this.users[userIndex] = { ...this.users[userIndex], ...updatedUser };
    }
  }

  getUsersCount(): number {
    return this.users.length;
  }

}
