import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterModule,RouterLink,RouterLinkActive,RouterOutlet,MatToolbarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AngularClient';

  isLoggedIn = localStorage.getItem('token');

  // constructor(private authService: AuthService) {
  //   this.authService.token$.subscribe(token => {
  //     this.isLoggedIn = token !== null;
  //   });

  // get isLoggedIn(): boolean {
  //   return localStorage.getItem('token') !== null;
  // }
  
}
