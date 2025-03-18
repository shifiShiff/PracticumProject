import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenSubject = new BehaviorSubject<string | null>(localStorage.getItem('token'));
  token$ = this.tokenSubject.asObservable(); // שידור לכל המנויים

  constructor(private http:HttpClient, private router:Router) { }



  setToken(token: string | null) {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
    this.tokenSubject.next(token); // מודיע לכל הקומפוננטות שהטוקן השתנה
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }



  Login(value: any){
    this.http.post('http://localhost:5131/api/User/login', value)
        .subscribe({
          next:(res:any)=>{
         this.setToken(res.token); // עדכון ה-Subject

          localStorage.setItem('token', res.token);
          localStorage.setItem('userId',res.userId)

          this.router.navigate(['/dashboard'])
          console.log('Logged in successfully!');

          },
          error:err=>{alert('Error, User not found')
            this.router.navigate(['/auth'])

          }
        });
  }


  Register(value: any){
    const formData = {
      UserId: value.id,
      Name: value.name,
      Email:value.email,
      PasswordHash: value.password
    };
    this.http.post('http://localhost:5131/api/User/register/Admin',formData )
    .subscribe ({
      next: (res:any) => {console.log('Register successfully!');
        localStorage.setItem('token', res.token);
          localStorage.setItem('userId',res.userId)

      this.router.navigate(['/dashboard'])
    },
    error: err=>{
      
      alert('Error, register failed');
      this.router.navigate(['/auth'])
    }
    });
  }
}
