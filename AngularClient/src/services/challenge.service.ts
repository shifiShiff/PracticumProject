import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {

  private apiUrl = 'http://localhost:5131/api/Challenge'; 

  constructor(private http: HttpClient) {}

  getChallengesWithVotes(): Observable<any[]> {
    const res = this.http.get<any[]>(this.apiUrl);
    console.log(res);
    return res;
  }
  getChallenges(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/allChallenges`);
  }

  getWinnerDetails(challengeId: number): Observable<any> {
    const details= this.http.get<any>(`${this.apiUrl}/${challengeId}/winner`);
    console.log("In get winner"+details);
    return details;
    
    
  }

  closeChallenge(challengeId: number): Observable<any> {
    console.log("In close challenge");
    
    const result = this.http.put(`${this.apiUrl}/${challengeId}`, {});
      console.log("Challenge closed successfully:", result);
 
    return result;
  }


  AddCallenge(challenge: any): Observable<any> {
    console.log("In add challenge");
    
    return this.http.post(`${this.apiUrl}`, {Title: challenge.title, Description: challenge.description});
  }

}
