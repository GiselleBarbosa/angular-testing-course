import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UsersService } from './shared/services/users.service';
import { UserListComponent } from './views/user-list/user-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, UserListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [UsersService],
})
export class AppComponent {}
