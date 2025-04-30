import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {

  private apiUrl = environment.apiUrl ; 

  constructor(private http: HttpClient) {}

  getChallengesWithVotes(): Observable<any[]> {
    const res = this.http.get<any[]>(`${this.apiUrl}/Challenge`);
    return res;
  }
  getChallenges(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Challenge/allChallenges`);
  }

  getWinnerDetails(challengeId: number): Observable<any> {
    const details= this.http.get<any>(`${this.apiUrl}/Challenge/${challengeId}/winner`);
    return details;
     
  }
  getWinnerImage(challengeId: number): Observable<any> {
    const details= this.http.get<any>(`${this.apiUrl}/Image/TopImage${challengeId}`);
    return details;
     
  }

  closeChallenge(challengeId: number): Observable<any> {
   
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
    return this.http.post(`${this.apiUrl}/Challenge`, {Title: challenge.title, Description: challenge.description});
  }

}
