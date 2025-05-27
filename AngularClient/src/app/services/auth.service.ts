import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
    private apiUrl = environment.apiUrl; 
  

  private isLoggedInSubject = new BehaviorSubject<boolean>(false); 
  isLoggedIn$ = this.isLoggedInSubject.asObservable(); 

  constructor(private http:HttpClient, private router:Router) {
    const token = localStorage.getItem('authToken');
    this.isLoggedInSubject.next(!!token);
  }


  Login(value: any){
    this.http.post(`${this.apiUrl}/User/login/admin`, value)
        .subscribe({
          next:(res:any)=>{

          localStorage.setItem('token', res.token);
          this.isLoggedInSubject.next(true);

          this.router.navigate(['/dashboard'])
          console.log('Logged in successfully!');

          },
          error:err=>{alert('Error, some worng details')
            this.router.navigate(['/auth'])

          }
        });
  }

}