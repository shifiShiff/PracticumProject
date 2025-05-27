import { Component } from '@angular/core';
import {  RouterModule, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterModule, RouterOutlet, MatToolbarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent
{

  title = 'AngularClient';

  isLoggedIn: boolean|null = null;


  constructor(private authService: AuthService) {
    
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      console.log('isLoggedIn:', this.isLoggedIn);
      if(isLoggedIn == false)
      {
        localStorage.removeItem('token');
       
      }
    });
  }

  
}
