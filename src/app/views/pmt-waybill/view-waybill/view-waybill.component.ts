import { Component, OnInit } from "@angular/core";
import { ApiService, UtilsService } from "../../../_services";
import { Router } from "@angular/router";

@Component({
  selector: "app-view-waybill",
  templateUrl: "./view-waybill.component.html",
  styleUrls: ["./view-waybill.component.scss"]
})
export class ViewWaybillComponent implements OnInit {
  pmtwaybill: any;
  pmtwaybills: any;
  constructor(
    private apiservice: ApiService,
    private utilsService: UtilsService,
    private routes: Router
  ) {}

  name: string;
  id: "";
  transaction_code: "";
  pmt_schedule_id: "";
  fare_total: "";
  is_dto: "";
  dto_maintenance: "";
  dto_repayment: "";
  driver_allowance: "";
  dto_service_charge: "";
  departure_date: "";
  boarding_status: "";

  ngOnInit() {
    const id = window.localStorage.getItem("waybilldetailsid");
    // console.log(id);
    this.pmtwaybills = this.utilsService.cleanObject(this.getPmtWaybill(id));
    console.log("this what i want to show" + JSON.stringify(this.pmtwaybills));
    this.name = "PMTWAYBILL Detail";
    this.id = this.pmtwaybills.id;
    this.transaction_code = this.pmtwaybills.transaction_code;
    this.pmt_schedule_id = this.pmtwaybills.pmt_schedule_id;
    this.fare_total = this.pmtwaybills.fare_total;
    this.dto_maintenance = this.pmtwaybills.dto_maintenance;
    this.dto_repayment = this.pmtwaybills.dto_repayment;
    this.is_dto = this.pmtwaybills.is_dto;
    this.driver_allowance = this.pmtwaybills.driver_allowance;
    this.dto_service_charge = this.pmtwaybills.dto_service_charge;
    this.departure_date = this.pmtwaybills.departure_date;
    this.boarding_status = this.pmtwaybills.boarding_status;
  }

  getPmtWaybill(id) {
    const storedRecord = window.localStorage.getItem("pmtwaybill");
    if (storedRecord) {
      this.pmtwaybill = JSON.parse(storedRecord);
    }
    const t = this.apiservice.getSetting(this.pmtwaybill, id);
    return t[0];
  }

  goBack() {
    this.routes.navigate(["pmt-waybill"]);
  }

  EditRecord(pmtwaybills): void {
    window.localStorage.removeItem("editpmtwaybillid");
    window.localStorage.setItem("editpmtwaybillid", pmtwaybills.id);
    this.routes.navigate(["pmt-waybill/edit"]);
  }

  // terminalEdit(terminal: Terminal): void {
  //   window.localStorage.removeItem('terminalEditId');
  //   window.localStorage.setItem('terminalEditId', terminal.id);
  //   this.router.navigate(['terminal/edit']);
  // }
}
