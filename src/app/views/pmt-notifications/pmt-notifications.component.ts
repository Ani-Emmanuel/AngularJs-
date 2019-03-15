import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../_services";
import { Router } from "@angular/router";

@Component({
  selector: "app-pmt-notifications",
  templateUrl: "./pmt-notifications.component.html",
  styleUrls: ["./pmt-notifications.component.scss"]
})
export class PmtNotificationsComponent implements OnInit {
  notification: object;
  constructor(private apiservice: ApiService, private route: Router) {}

  ngOnInit() {
    const notify = window.localStorage.getItem("notification");
    if (notify) {
      this.notification = JSON.parse(notify);
    } else {
      this.getAllNotification();
    }
    //this.getAllNotification();
  }

  getAllNotification() {
    this.apiservice.getNotification().subscribe(data => {
      this.notification = data.payload;
      window.localStorage.removeItem("notification");
      window.localStorage.setItem(
        "notification",
        JSON.stringify(this.notification)
      );
    });
  }

  editRecord(settings: any) {
    window.localStorage.removeItem("notification_id");
    window.localStorage.setItem("notification_id", settings.id);
    this.route.navigate(["pmt-notifications/edit"]);
  }

  createNotification() {
    this.route.navigate(["pmt-notifications/create"]);
  }

  DeleteRecord(id) {
    this.apiservice.deleteNotification(id).subscribe(data => {
      if (data.success) {
        //alert("Record deleted successfull!!!");
        swal(
          "Deleted Successfully!",
          "Record waybill Deleted successfully!",
          "success"
        );
        console.log("Record Delected Successfully");
      }
    });
  }

  DelectItem(id) {
    const result = confirm("!!Are you sure you want to Delete this Record!!");
    if (result) {
      console.log(id);
      event.preventDefault();
      this.DeleteRecord(id);
    }
  }

  RecordDetail(id) {
    window.localStorage.removeItem("notification_detail");
    window.localStorage.setItem("notification_detail", id);
    this.route.navigate(["pmt-notifications/detail"]);
  }
}
