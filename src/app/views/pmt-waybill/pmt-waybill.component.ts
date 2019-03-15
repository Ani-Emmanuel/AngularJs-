import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../_services/api.service";
import { Router } from "@angular/router";
import { PmtWaybill } from "../../_models/pmt-waybill";
import { SweetAlertService } from "angular-sweetalert-service";
import swal from "sweetalert";

@Component({
  selector: "app-pmt-waybill",
  templateUrl: "./pmt-waybill.component.html",
  styleUrls: ["./pmt-waybill.component.scss"]
})
export class PmtWaybillComponent implements OnInit {
  response: any;
  success = false;
  message = "";
  pmtwaybills: object;
  storedRecord: object;
  constructor(
    private apiservice: ApiService,
    private route: Router,
    private alertService: SweetAlertService
  ) {}

  ngOnInit() {
    const bill = window.localStorage.getItem("pmtwaybill");
    this.storedRecord = JSON.parse(bill);
    if (this.storedRecord) {
      this.pmtwaybills = this.storedRecord;
    } else {
      this.getAllWaybills();
    }
  }

  //This the method for getting the list of all the waybills
  getAllWaybills(): void {
    this.apiservice.getPmtWaybill().subscribe(data => {
      this.response = data;
      this.pmtwaybills = this.response.payload;
      this.message = this.response.message;
      this.success = this.response.success;
      if (this.success) {
        console.log(this.response);
        window.localStorage.setItem(
          "pmtwaybill",
          JSON.stringify(this.pmtwaybills)
        );
        window.localStorage.setItem(
          "pmtwaybillDate",
          JSON.stringify(new Date())
        );
      }
    });
  }

  createWaybill() {
    this.route.navigate(["pmt-waybill/create"]);
  }

  pmtwaybillEdit(pmtwaybill: PmtWaybill) {
    window.localStorage.removeItem("editpmtwaybillid");
    window.localStorage.setItem("editpmtwaybillid", pmtwaybill.id);
    this.route.navigate(["pmt-waybill/edit"]);
  }

  pmtwaybillDetail(waybilldetails: PmtWaybill) {
    window.localStorage.removeItem("waybilldetailsid");
    window.localStorage.setItem("waybilldetailsid", waybilldetails.id);
    console.log("this is the id" + waybilldetails.id);
    this.route.navigate(["pmt-waybill/view"]);
  }

  DeletePmtwaybill(id: PmtWaybill["id"]) {
    this.apiservice.deletePmtWaybill(id).subscribe(data => {
      if (data.success) {
        //alert("Record waybill Deleted successfully");
        swal(
          "Deleted Successfully!",
          "Record waybill Deleted successfully!",
          "success"
        );
        console.log("Way bill Deleted Successfully");
      } else {
        console.log(data.message);
      }
    });
  }

  DeletePmt(id) {
    var result = confirm("!!Are you sure, you want to delete this Waybill!!");
    if (result) {
      event.preventDefault();
      this.DeletePmtwaybill(id);
    }
  }
}
