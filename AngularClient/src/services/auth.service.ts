import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 
  constructor(private http:HttpClient, private router:Router) { }



  Login(value: any){
    this.http.post('http://localhost:5131/api/User/login/admin', value)
        .subscribe({
          next:(res:any)=>{

          localStorage.setItem('token', res.token);
          this.router.navigate(['/dashboard'])
          console.log('Logged in successfully!');

          },
          error:err=>{alert('Error, User not found')
            this.router.navigate(['/auth'])

          }
        });
  }

}