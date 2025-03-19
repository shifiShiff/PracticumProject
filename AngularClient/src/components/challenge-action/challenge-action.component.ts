import { Component } from '@angular/core';
import { ChallengeService } from '../../services/challenge.service';
import { forkJoin, lastValueFrom } from 'rxjs';
import { MatCardModule } from '@angular/material/card'; // כרטיסים
import { MatButtonModule } from '@angular/material/button'; // כפתורים
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // ספינר טעינה
import { MatDialog } from '@angular/material/dialog';
import { AddChallengeDialogComponent } from '../add-challenge-dialog/add-challenge-dialog.component';

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
  load: boolean = true; // מצב טעינה

  constructor(private challengeService: ChallengeService, private dialog: MatDialog) {}


  ngOnInit() {
    this.loadChallenges();
  }

 
changeload() {
  this.load=!this.load;
  console.log(this.load);
  
}

  // loadChallenges() {
  //   this.challengeService.getChallenges().subscribe(

  //     challenges => {
  //       this.challenges = challenges;
  //       console.log('Challenges loaded:', this.challenges);
  
  //       // שליפת פרטי הזוכה עבור כל אתגר
  //       this.challenges.forEach(challenge => {
  //         this.challengeService.getWinnerDetails(challenge.id).subscribe({
  //           next: (winnerDetails) => {
  //             challenge.winnerDetails = winnerDetails; // הוספת פרטי הזוכה לאתגר
  //             console.log(`Winner details for challenge ${challenge.id}:`, winnerDetails);
  //           },
  //           error: (error) => {
  //             console.error(`Error loading winner details for challenge ${challenge.id}:`, error);
  //           },
  //           complete: () => {
  //             console.log(`Finished loading winner details for challenge ${challenge.id}`);
  //           }
  //         });
  //       }
  //     );
  //     },
  //     error => {
  //       console.error('Error loading challenges:', error);
  //     }
  // );
  // }

  loadChallenges() {
    this.challengeService.getChallenges().subscribe({
      next: (challenges) => {
        this.challenges = challenges;
        console.log('Challenges loaded:', this.challenges);
  
        // שליפת פרטי הזוכה עבור כל אתגר
        this.challenges.forEach(challenge => {
          this.challengeService.getWinnerDetails(challenge.id).subscribe({
            next: (winnerDetails) => {
              challenge.winnerDetails = winnerDetails; // הוספת פרטי הזוכה לאתגר
              console.log(`Winner details for challenge ${challenge.id}:`, winnerDetails);
            },
            error: (error) => {
              console.error(`Error loading winner details for challenge ${challenge.id}:`, error);
            },
            complete: () => {
              console.log(`Finished loading winner details for challenge ${challenge.id}`);
              this.checkIfChallengesLoaded(); // קריאה לפונקציה בסיום כל קריאה
            }
          });
        });
      },
      error: (error) => {
        console.error('Error loading challenges:', error);
      }
    });
  }
  


  checkIfChallengesLoaded() {
    const allChallengesLoaded = this.challenges.every(challenge => challenge.winnerDetails); 
    this.load = allChallengesLoaded;  // אם יש אתגר ללא winnerDetails, נשאיר את load ב-true
  }

  closeChallenge(challengeId: number) {
  this.challengeService.closeChallenge(challengeId).subscribe({
    next: (response: any) => {
      console.log('Challenge closed successfully:', response);
      this.loadChallenges(); // טוען מחדש את רשימת האתגרים
    },
    error: (error: any) => {
      console.error('Error closing challenge:', error);
    },
    complete: () => {
      console.log('Close challenge request completed.');
    }
  });
}


openAddChallengeDialog() {
  const dialogRef = this.dialog.open(AddChallengeDialogComponent, {
    width: '400px'
  });

  dialogRef.afterClosed().subscribe(async result => {
    if (result) {
      console.log('Challenge added:', result);
      await this.challengeService.AddCallenge(result).subscribe({
        next: (response: any) => {
          console.log('Challenge Add successfully:', response);
          this.loadChallenges(); // טוען מחדש את רשימת האתגרים
        },
        error: (error: any) => {
          console.error('Error Adding challenge:', error);
        },
      // קריאה לשרת להוספת האתגר
    }
  )};
}
)}




}

