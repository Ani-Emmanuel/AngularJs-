import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ApiService, UtilsService } from "../../../_services";
import { Router } from "@angular/router";
import { SelectOptionInterface } from "../../../_models";
import swal from "sweetalert";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.scss"]
})
export class EditComponent implements OnInit {
  // addForm: FormGroup;
  payload: any;
  drivers: SelectOptionInterface[];
  activeDriver: SelectOptionInterface[];

  vehicleOwners: SelectOptionInterface[];
  activeVehicleOwner: SelectOptionInterface[];

  staff: SelectOptionInterface[];
  activeStaff: SelectOptionInterface[];
  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private utilsService: UtilsService,
    private routes: Router
  ) {}
  editForm: FormGroup;
  ngOnInit() {
    const id = window.localStorage.getItem("notification_id");
    this.payload = this.utilsService.cleanObject(this.getNotification(id));
    this.getDrivers();
    this.getStaff();
    this.getVehicleOwners();

    this.editForm = this.formBuilder.group({
      user_type: [""],
      staff_id: [""],
      driver_id: [""],
      vehicle_owner_id: [""],
      message: [""],
      notification_status: [""]
    });

    this.editForm.get("user_type").setValue(this.payload.user_type);
    this.editForm.get("staff_id").setValue(this.payload.staff_id);
    this.editForm.get("driver_id").setValue(this.payload.driver_id);
    this.editForm
      .get("vehicle_owner_id")
      .setValue(this.payload.vehicle_owner_id);
    this.editForm.get("message").setValue(this.payload.message);
    this.editForm
      .get("notification_status")
      .setValue(this.payload.notification_status);
  }

  getStaff() {
    const storeRecords = window.localStorage.getItem("Staff");

    if (storeRecords) {
      this.staff = JSON.parse(storeRecords);
      console.log(this.staff);
      return;
    }
    this.apiService.getStaff().subscribe(data => {
      if (data.success) {
        this.staff = data.payload.map(item => ({
          id: item.id,
          text: item.surname + " " + item.other_name
        }));
        window.localStorage.setItem("Staff", JSON.stringify(this.staff));
      } else {
        console.log(data.message);
      }
    });
  }

  getDrivers() {
    const storeRecords = window.localStorage.getItem("Drivers");
    if (storeRecords) {
      this.drivers = JSON.parse(storeRecords);
      console.log(this.drivers);
      return;
    }
    this.apiService.getDriver().subscribe(data => {
      if (data.success) {
        this.drivers = data.payload.map(item => ({
          id: item.id,
          text: item.surname + " " + item.other_name
        }));
        window.localStorage.setItem("Drivers", JSON.stringify(this.drivers));
      } else {
        console.log(data.message);
      }
    });
  }

  getVehicleOwners() {
    const storeRecords = window.localStorage.getItem("VehicleOnwers");
    if (storeRecords) {
      this.vehicleOwners = JSON.parse(storeRecords);
      console.log(this.vehicleOwners);
      return;
    }

    this.apiService.getVehicleOwner().subscribe(data => {
      if (data.success) {
        this.vehicleOwners = data.payload.map(item => ({
          id: item.id,
          text: item.surname + " " + item.other_name
        }));
        window.localStorage.setItem(
          "VehicleOnwers",
          JSON.stringify(this.vehicleOwners)
        );
      } else {
        console.log(data.message);
      }
    });
  }

  onUpdate() {
    const id = window.localStorage.getItem("notification_id");
    const payload = this.editForm.value;
    this.apiService.updateNotification(id, payload).subscribe(data => {
      if (data) {
        swal("Record Updated!", "Record updated successfully!", "success");
      }
    });
  }

  Back() {
    this.routes.navigate(["/pmt-notifications"]);
  }

  notification = [
    { id: "PENDING", text: "PENDING" },
    { id: "CLOSED", text: "CLOSED" }
  ];

  User_Type = [
    { id: "STAFF", text: "STAFF" },
    { id: "DRIVER", text: "DRIVER" },
    { id: "CUSTOMER", text: "CUSTOMER" },
    { id: "VEHICLE_OWNER", text: "VEHICLE_OWNER" }
  ];

  getNotification(id) {
    console.log("\nNotification Id", id);
    const storedRecord = window.localStorage.getItem("notification");
    if (storedRecord) {
      this.payload = JSON.parse(storedRecord);
    }
    const t = this.apiService.getSetting(this.payload, id);
    return t[0];
  }
}
