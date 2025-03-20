import { Component } from '@angular/core';
import { ChallengeService } from '../../services/challenge.service';
import { NgxApexchartsModule } from "ngx-apexcharts";

@Component({
  selector: 'app-votegraph',
  imports: [NgxApexchartsModule],
  templateUrl: './votegraph.component.html',
  styleUrl: './votegraph.component.css'
})
export class VotegraphComponent {
  chartSeries: any[] = [];
  chartOptions: any;

  constructor(private challengeService: ChallengeService) {}




  ngOnInit() {
    this.challengeService.getChallengesWithVotes().subscribe(data => {
      console.log('Data from service:', data);

      const categories = data.map(d => d.challengeTitle);
      const votes = data.map(d => d.votes);

      this.chartSeries = [{ name: 'Votes', data: votes }];
      this.chartOptions = {
        chart: {
          type: 'bar', 
          height: '300%',
          width: '100%',
          toolbar: {
            show: true,
            tools: {
              download: true,
              selection: true,
              zoom: true,
              zoomin: true,
              zoomout: true,
              pan: false,
              reset: true
            },
            autoSelected: 'zoom'
          }
        },
        plotOptions: {
          bar: {
            horizontal: false, 
            columnWidth: '50%', 
            endingShape: 'rounded' 
          }
        },
        dataLabels: {
          enabled: true 
        },
        xaxis: {
          categories: categories 
        },
        yaxis: {
          title: {
            text: 'Votes'
          }
        },
        fill: {
          opacity: 1,
          colors: ['#3f51b5'] 
        },
        
      };
    });
  }
}




