import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {

  private apiUrl = environment.apiUrl ; 
  // private apiUrl = 'http://localhost:5131/api/Challenge'; 

  constructor(private http: HttpClient) {}

  getChallengesWithVotes(): Observable<any[]> {
    const res = this.http.get<any[]>(`${this.apiUrl}/Challenge`);
    console.log(res);
    return res;
  }
  getChallenges(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Challenge/allChallenges`);
  }

  getWinnerDetails(challengeId: number): Observable<any> {
    const details= this.http.get<any>(`${this.apiUrl}/Challenge/${challengeId}/winner`);
    console.log("In get winner"+details);
    return details;
     
  }

  closeChallenge(challengeId: number): Observable<any> {
    console.log("In close challenge");
   
    return this.http.put(`${this.apiUrl}/Challenge/${challengeId}`, {}).pipe(
      tap(result => console.log("Challenge closed successfully:", result)),
      catchError(error => {
        console.error("Error closing challenge:", error);
        alert("No votes in this challenge")
        return throwError(() => new Error("No votes in this challenge"));
      })
    );
  }


  AddCallenge(challenge: any): Observable<any> {
    console.log("In add challenge");
    
    return this.http.post(`${this.apiUrl}/Challenge`, {Title: challenge.title, Description: challenge.description});
  }

}
