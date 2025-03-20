import { Component } from '@angular/core';
import { VotegraphComponent } from "../votegraph/votegraph.component";
import { ChallengeActionComponent } from "../challenge-action/challenge-action.component";
import { Router, RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  imports: [ RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([`dashboard/${route}`]);
  }
}
