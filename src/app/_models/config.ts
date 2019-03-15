// import { ApiService } from "../_services";
// import { OnInit } from '@angular/core';

// export class Config implements OnInit{
//   schedules: object;
//   settings: object;
//   constructor(private apiservice: ApiService) {}

//   getSchedule() {
//     this.apiservice.getSchedule().subscribe(data => {
//       this.schedules = data.payload;
//       if (data.success) {
//         window.localStorage.setItem("shedules", JSON.stringify(this.schedules));
//       }
//     });
//   }

//   getSettings() {
//     this.apiservice.getSettings().subscribe(data => {
//       this.settings = data;
//       if (data) {
//         window.localStorage.setItem("settings", JSON.stringify(this.settings));
//       }
//     });
//   }
// }
