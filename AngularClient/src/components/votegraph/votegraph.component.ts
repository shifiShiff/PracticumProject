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



  // ngOnInit() {
  //   this.challengeService.getChallengesWithVotes().subscribe(data => {
  //     console.log('Data from service:', data); // בדוק את הנתונים שמגיעים מהשירות
  
  //     // שליפת שמות האתגרים וכמות ההצבעות
  //     const categories = data.map(d => d.challengeTitle); // השתמש ב-challengeTitle במקום challengeName
  //     const votes = data.map(d => d.votes);
  
  //     // הגדרת הנתונים לגרף
  //     this.chartSeries = [{ name: 'Votes', data: votes }];
  //     this.chartOptions = {
  //       chart: {
  //         type: 'area',
  //         height: '380%',
  //         width: '150%',
  //         toolbar: {
  //           show: true,
  //           tools: {
  //             download: true,
  //             selection: true,
  //             zoom: true,
  //             zoomin: true,
  //             zoomout: true,
  //             pan: true,
  //             reset: true
  //           },
  //           autoSelected: 'zoom'
  //         },
  //         zoom: {
  //           enabled: true,
  //           type: 'x',
  //           autoScaleYaxis: true
  //         }
  //       },
  //       xaxis: {
  //         categories: categories // שמות האתגרים
  //       },
  //       stroke: {
  //         curve: 'smooth'
  //       },
  //       fill: {
  //         type: 'gradient'
  //       }
  //     };
  //   });
  // }


//   ngOnInit() {
//     this.challengeService.getChallengesWithVotes().subscribe(data => {
//       console.log('Data from service:', data); // בדוק את הנתונים שמגיעים מהשירות

//       // שליפת שמות האתגרים וכמות ההצבעות
//       const categories = data.map(d => d.challengeTitle); // השתמש ב-challengeTitle במקום challengeName
//       const votes = data.map(d => d.votes);

//       // הגדרת הנתונים לגרף
//       this.chartSeries = [{ name: 'Votes', data: votes }];
//       this.chartOptions = {
//         chart: {
//           type: 'area',
//           height: '350%', // התאמה אוטומטית לגובה
//           width: '100%', // התאמה אוטומטית לרוחב
//           toolbar: {
//             show: true,
//             tools: {
//               download: true,
//               selection: true,
//               zoom: true,
//               zoomin: true,
//               zoomout: true,
//               pan: true,
//               reset: true
//             },
//             autoSelected: 'zoom'
//           },
//           zoom: {
//             enabled: true,
//             type: 'x',
//             autoScaleYaxis: true
//           }
//         },
//         xaxis: {
//           categories: categories // שמות האתגרים
//         },
//         stroke: {
//           curve: 'smooth'
//         },
//         fill: {
//           type: 'gradient'
//         },
//         responsive: [
//           {
//             breakpoint: 768, // מסכים קטנים
//             options: {
//               chart: {
//                 height: 300 // גובה מותאם למסכים קטנים
//               },
//               xaxis: {
//                 labels: {
//                   show: true
//                 }
//               }
//             }
//           },
//           {
//             breakpoint: 480, // מסכים קטנים מאוד
//             options: {
//               chart: {
//                 height: 250 // גובה מותאם למסכים קטנים מאוד
//               },
//               xaxis: {
//                 labels: {
//                   show: true
//                 }
//               }
//             }
//           }
//         ]
//       };
//       this.addNonPassiveEventListeners();

//     });
//   }

//   // פונקציה להוספת מאזינים מותאמים אישית
// // addNonPassiveEventListeners() {
// //   const canvas = document.querySelector('.apexcharts-canvas');
// //   if (canvas) {
// //     canvas.addEventListener(
// //       'wheel',
// //       (e) => {
// //         e.preventDefault();
// //       },
// //       { passive: false }
// //     );
// //   }
// // }

// addNonPassiveEventListeners() {
//   const canvas = document.querySelector('.apexcharts-canvas');
//   if (canvas) {
//     canvas.addEventListener(
//       'wheel',
//       (e) => {
//         e.stopImmediatePropagation(); // עצירת האירוע
//         // לא קוראים ל-preventDefault במקרה הזה
//       },
//       { passive: true } // שים את passive על true כדי למנוע את השגיאה
//     );
//   }
// }

  ngOnInit() {
    this.challengeService.getChallengesWithVotes().subscribe(data => {
      console.log('Data from service:', data);

      // שליפת שמות האתגרים וכמות ההצבעות
      const categories = data.map(d => d.challengeTitle);
      const votes = data.map(d => d.votes);

      // הגדרת הנתונים לגרף
      this.chartSeries = [{ name: 'Votes', data: votes }];
      this.chartOptions = {
        chart: {
          type: 'bar', // שינוי סוג הגרף ל-Bar Chart
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
            horizontal: false, // עמודות אנכיות
            columnWidth: '50%', // רוחב העמודות
            endingShape: 'rounded' // עיצוב עמודות מעוגלות
          }
        },
        dataLabels: {
          enabled: true // הצגת ערכים על העמודות
        },
        xaxis: {
          categories: categories // שמות האתגרים
        },
        yaxis: {
          title: {
            text: 'Votes'
          }
        },
        fill: {
          opacity: 1,
          colors: ['#3f51b5'] // צבע עמודות
        },
        // responsive: [
        //   {
        //     breakpoint: 768, // מסכים קטנים
        //     options: {
        //       chart: {
        //         height: 300
        //       },
        //       xaxis: {
        //         labels: {
        //           show: true
        //         }
        //       }
        //     }
        //   },
        //   {
        //     breakpoint: 480, // מסכים קטנים מאוד
        //     options: {
        //       chart: {
        //         height: 250
        //       },
        //       xaxis: {
        //         labels: {
        //           show: true
        //         }
        //       }
        //     }
        //   }
        // ]
      };
    });
  }
}




