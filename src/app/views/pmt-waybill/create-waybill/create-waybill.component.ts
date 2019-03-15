import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../../_services";
import { Router } from "@angular/router";
import { SelectOptionInterface } from "../../../_models";
import { FormBuilder, FormGroup } from "@angular/forms";
import swal from "sweetalert";

@Component({
  selector: "app-create-waybill",
  templateUrl: "./create-waybill.component.html",
  styleUrls: ["./create-waybill.component.scss"]
})
export class CreateWaybillComponent implements OnInit {
  addForm: FormGroup;
  schedules: SelectOptionInterface[];
  activeSchedule: SelectOptionInterface[];

  storedRecord: object;
  constructor(
    private apiservice: ApiService,
    private route: Router,
    private fromBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.getSchedule();

    this.addForm = this.fromBuilder.group({
      transaction_code: [""],
      pmt_schedule_id: [""],
      departure_date: [""],
      boarding_status: [""]
    });
  }

  getSchedule() {
    const storedRecord = window.localStorage.getItem("shedules");
    if (storedRecord) {
      this.schedules = JSON.parse(storedRecord);
      console.log(this.schedules);
      return;
    }
    this.apiservice.getSchedule().subscribe(data => {
      if (data.success) {
        this.schedules = data.payload.map(item => ({
          id: item.id,
          text: item.schedule_status
        }));
        window.localStorage.setItem("shedules", JSON.stringify(this.schedules));
      } else {
        console.log(data.message);
      }
    });
  }

  BoardingStatus = [
    { id: "OPEN", text: "OPEN" },
    { id: "CLOSED", text: "CLOSED" }
  ];

  createWaybill(id: string) {
    console.log(id);
    window.localStorage.removeItem("schedule_id");
    window.localStorage.setItem("schedule_id", id);
    this.route.navigate(["pmt-waybill/create-waybill"]);
  }

  onCreate() {
    const payload = this.addForm.value;
    this.apiservice.postPmtWaybill(payload).subscribe(data => {
      if (data.success) {
        swal("Waybill created!", "Waybill created successfully!", "success");
        // console.log("Posted Successfully");
      } else {
        console.log(data.message);
      }
    });
  }

  Back() {
    this.route.navigate(["/pmt-waybill"]);
  }
}
