import { Component, OnInit } from "@angular/core";
import { ApiService, UtilsService } from "../../../_services";
import { Router } from "@angular/router";

@Component({
  selector: "app-detail",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.scss"]
})
export class DetailComponent implements OnInit {
  payload: any;

  constructor(
    private apiService: ApiService,
    private utilsService: UtilsService,
    private routes: Router
  ) {}

  id: "";
  name: string;
  user_type: "";
  staff_id: "";
  driver_id: "";
  vehicle_owner_id: "";
  message: "";
  notification_status: "";

  ngOnInit() {
    const id = window.localStorage.getItem("notification_detail");
    this.payload = this.utilsService.cleanObject(this.getNotification(id));
    this.name = "Notification Details";
    this.id = this.payload.id;
    this.user_type = this.payload.user_type;
    this.staff_id = this.payload.staff_id.id;
    this.driver_id = this.payload.driver_id.id;
    this.vehicle_owner_id = this.payload.vehicle_owner_id.id;
    this.message = this.payload.message;
    this.notification_status = this.payload.notification_status;
  }

  getNotification(id) {
    console.log("\nNotification Id", id);
    const storedRecord = window.localStorage.getItem("notification");
    if (storedRecord) {
      this.payload = JSON.parse(storedRecord);
    }
    const t = this.apiService.getSetting(this.payload, id);
    return t[0];
  }

  goBack() {
    this.routes.navigate(["pmt-notifications"]);
  }

  EditRecord(settings) {
    window.localStorage.removeItem("notification_id");
    window.localStorage.setItem("notification_id", settings.id);
    this.routes.navigate(["pmt-notifications/edit"]);
  }
}
