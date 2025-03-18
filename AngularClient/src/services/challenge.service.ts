import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  closeChallenge(challengeId: number){
    console.log("In close challenge");
    
    this.http.put(`${this.apiUrl}/${challengeId}`,{}).subscribe(res=>{
      console.log("Challenge closed successfully:", res);
    },
    error => {
      console.error("Error closing challenge:", error);
    });
    
    console.log("In close challenge");  
    

  }

}
