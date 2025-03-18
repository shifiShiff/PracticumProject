import { Component } from '@angular/core';
import { VotegraphComponent } from "../votegraph/votegraph.component";
import { ChallengeActionComponent } from "../challenge-action/challenge-action.component";

@Component({
  selector: 'app-dashboard',
  imports: [VotegraphComponent, ChallengeActionComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
