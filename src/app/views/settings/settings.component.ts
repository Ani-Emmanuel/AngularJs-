import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../_services";
import { Router } from "@angular/router";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.scss"]
})
export class SettingsComponent implements OnInit {
  settings: any;
  Id: string;
  constructor(private apiservice: ApiService, private route: Router) {}

  ngOnInit() {
    const settings = window.localStorage.getItem("Settings");
    if (settings) {
      this.settings = JSON.parse(settings);
    } else {
      this.getAllSettings();
    }
    this.getAllSettings();
  }

  getAllSettings() {
    this.apiservice.getSettings().subscribe(data => {
      this.settings = data.payload;
      if (data) {
        window.localStorage.removeItem("Settings");
        window.localStorage.setItem("Settings", JSON.stringify(this.settings));
      }
    });
  }

  editRecord(settings: any) {
    window.localStorage.removeItem("Settings_id");
    window.localStorage.setItem("Settings_id", settings.id);
    this.route.navigate(["settings/edit"]);
  }

  // editRecord(setting: any) {
  //   this.Id = setting.id;
  //   console.log(this.Id);
  //   this.retrieveSettings(this.Id);
  //   window.localStorage.removeItem("Settings_id");
  //   window.localStorage.setItem("Settings_id", setting.id);
  //   this.route.navigate(["settings/edit"]);
  // }
  retrieveSettings(id: string) {
    window.localStorage.removeItem("SettingWithId");
    return this.apiservice.retrieveSettings(id).subscribe(data => {
      window.localStorage.setItem(
        "SettingWithId",
        JSON.stringify(data.payload)
      );
    });
  }
}
