import { Component } from '@angular/core';
import { ChallengeService } from '../../services/challenge.service';
import { forkJoin, lastValueFrom } from 'rxjs';
import { MatCardModule } from '@angular/material/card'; // כרטיסים
import { MatButtonModule } from '@angular/material/button'; // כפתורים
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // ספינר טעינה
@Component({
  selector: 'app-challenge-action',
  imports: [
        MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule],
  templateUrl: './challenge-action.component.html',
  styleUrl: './challenge-action.component.css'
})
export class ChallengeActionComponent {
  challenges: any[] = []; // רשימת האתגרים
  loading: boolean = true; // מצב טעינה

  constructor(private challengeService: ChallengeService) {}

//   async ngOnInit() {


// try {
//   // שליפת רשימת האתגרים
//   const challenges = await this.challengeService.getChallenges().toPromise();
//   this.challenges = challenges || [];

//   // לולאה לשליפת פרטי המנצחים
//   for (const challenge of this.challenges) {
//     const winnerDetails = await this.challengeService.getWinnerDetails(challenge.winnerId).toPromise();
//     challenge.winnerDetails = winnerDetails;
//   }

//   console.log('Updated challenges with winner details:', this.challenges);
// } catch (error) {
//   console.error('Error fetching challenges or winner details:', error);
// }
// }


// async ngOnInit() {
//   try {
//     this.challenges = await lastValueFrom(this.challengeService.getChallenges()) || [];

//     const winnerDetailsArray = await Promise.all(
//       this.challenges.map(challenge => 
//         lastValueFrom(this.challengeService.getWinnerDetails(challenge.winnerId))
//       )
//     );

//     this.challenges = this.challenges.map((challenge, index) => ({
//       ...challenge,
//       winnerDetails: winnerDetailsArray[index]
//     }));

//   } catch (error) {
//     console.error('Error fetching challenges or winner details:', error);
//   } finally {
//     this.loading = false;
//   }
// }

async ngOnInit() {
  try {
    console.log('Fetching challenges...');
    this.challenges = await lastValueFrom(this.challengeService.getChallenges()) || [];
    console.log('Challenges fetched:', this.challenges);

    const winnerDetailsArray = await Promise.all(
      this.challenges.map(async (challenge, index) => {
        console.log(`Fetching winner for challenge ${index}:`, challenge.winnerId);
        const winner = await lastValueFrom(this.challengeService.getWinnerDetails(challenge.id));
        console.log(`Winner details for challenge ${index}:`, winner);
        return winner;
      })
    );

    this.challenges = this.challenges.map((challenge, index) => ({
      ...challenge,
      winnerDetails: winnerDetailsArray[index]
    }));

    console.log('Final challenges list:', this.challenges);
  } catch (error) {
    console.error('Error fetching challenges or winner details:', error);
  } finally {
    console.log('Finished loading data');
    this.loading = false;
  }
}




  async closeChallenge(challengeId: number) {
    await this.challengeService.closeChallenge(challengeId);
    // לוגיקה לסגירת אתגר
    console.log(`Closing challenge with ID: ${challengeId}`);
  }
}

