import { Component, OnInit } from "@angular/core";
import { ApiService, UtilsService } from "../../../_services";
import {
  PmtWaybill,
  ApiResponse,
  SelectOptionInterface
} from "../../../_models";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import swal from "sweetalert";

@Component({
  selector: "app-edit-waybill",
  templateUrl: "./edit-waybill.component.html",
  styleUrls: ["./edit-waybill.component.scss"]
})
export class EditWaybillComponent implements OnInit {
  pmtwaybills: any;
  pmtwaybill: PmtWaybill;
  editForm: FormGroup;
  schedules: SelectOptionInterface[];

  response: ApiResponse;
  payload: any;
  Id: string;

  constructor(
    private apiservice: ApiService,
    private formBuilder: FormBuilder,
    private utilsService: UtilsService,
    private routes: Router
  ) {}

  ngOnInit() {
    const id = window.localStorage.getItem("editpmtwaybillid");
    this.Id = id;
    this.pmtwaybills = this.utilsService.cleanObject(this.getPmtWaybill(id));

    this.getSchedule();

    this.editForm = this.formBuilder.group({
      transaction_code: [""],
      pmt_schedule_id: [""],
      fare_total: [""],
      is_dto: [""],
      dto_maintenance: [""],
      dto_repayment: [""],
      driver_allowance: [""],
      dto_service_charge: [""],
      departure_date: [""],
      boarding_status: [""]
    });

    this.editForm
      .get("transaction_code")
      .setValue(this.pmtwaybills.transaction_code);
    this.editForm
      .get("pmt_schedule_id")
      .setValue(this.pmtwaybills.pmt_schedule_id);
    this.editForm.get("fare_total").setValue(this.pmtwaybills.fare_total);
    this.editForm.get("is_dto").setValue(this.pmtwaybills.is_dto);
    this.editForm
      .get("dto_maintenance")
      .setValue(this.pmtwaybills.dto_maintenance);
    this.editForm.get("dto_repayment").setValue(this.pmtwaybills.dto_repayment);
    this.editForm
      .get("dto_service_charge")
      .setValue(this.pmtwaybills.dto_service_charge);
    this.editForm
      .get("departure_date")
      .setValue(this.pmtwaybills.departure_date);
    this.editForm
      .get("boarding_status")
      .setValue(this.pmtwaybills.boarding_status);
    this.editForm
      .get("driver_allowance")
      .setValue(this.pmtwaybills.driver_allowance);
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

  Is_Dto = [
    { id: "true", text: "TRUE" },
    {
      id: "false",
      text: "FALSE"
    }
  ];

  getPmtWaybill(id) {
    const storedRecord = window.localStorage.getItem("pmtwaybill");
    if (storedRecord) {
      this.pmtwaybill = JSON.parse(storedRecord);
    }
    const t = this.apiservice.getSetting(this.pmtwaybill, id);
    return t[0];
  }

  onUpdate() {
    const payload = this.editForm.value;
    this.apiservice.updatePmtWaybill(payload, this.Id).subscribe(data => {
      if (data.success) {
        swal("Record created!", "Record created successfully!", "success");
        // console.log("Updated Successfully");
      } else {
        console.log(data.message);
      }
    });
  }
  Back() {
    this.routes.navigate(["/pmt-waybill"]);
  }
}
