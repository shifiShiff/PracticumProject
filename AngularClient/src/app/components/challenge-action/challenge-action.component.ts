import { Component } from '@angular/core';
import { ChallengeService } from '../../services/challenge.service';
import { MatCardModule } from '@angular/material/card'; 
import { MatButtonModule } from '@angular/material/button'; 
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; 
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
  challenges: any[] = []; 
  loading: boolean = true; 
  load: boolean = true; 

  constructor(private challengeService: ChallengeService, private dialog: MatDialog) {}


  ngOnInit() {
    this.loadChallenges();
  }

 
changeload() {
  this.load=!this.load;
  
}


  loadChallenges() {
    this.challengeService.getChallenges().subscribe({
      next: (challenges) => {
        this.challenges = challenges;
  
        this.challenges.forEach(challenge => {
          this.challengeService.getWinnerDetails(challenge.id).subscribe({
            next: (winnerDetails) => {
              challenge.winnerDetails = winnerDetails; 
              this.challengeService.getWinnerImage(challenge.id).subscribe({
                next: (winnerImage) => {
                  challenge.winnerImage = winnerImage; 
                },
                error: (error) => {
                  console.error(`Error loading winner image for challenge ${challenge.id}:`, error);
                }
              });
            },
            error: (error) => {
              console.error(`Error loading winner details for challenge ${challenge.id}:`, error);
            },
            complete: () => {
              this.checkIfChallengesLoaded(); 
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
    this.load = allChallengesLoaded; 
  }

  closeChallenge(challengeId: number) {
  this.challengeService.closeChallenge(challengeId).subscribe({
    next: (response: any) => {
      this.loadChallenges(); 
    },
    error: (error: any) => {
      console.error('Error closing challenge:', error);
    },
    complete: () => {
    }
  });
}


openAddChallengeDialog() {
  const dialogRef = this.dialog.open(AddChallengeDialogComponent, {
    width: '400px'
  });

  dialogRef.afterClosed().subscribe(async result => {
    if (result) {
      await this.challengeService.AddCallenge(result).subscribe({
        next: (response: any) => {
          this.loadChallenges(); 
        },
        error: (error: any) => {
          console.error('Error Adding challenge:', error);
        },
    }
  )};
}
)}




}

