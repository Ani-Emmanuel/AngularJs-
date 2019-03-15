import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../../_services";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { ApiResponse, SelectOptionInterface } from "../../../_models";
import swal from "sweetalert";

@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.scss"]
})
export class CreateComponent implements OnInit {
  addForm: FormGroup;

  drivers: SelectOptionInterface[];
  activeDriver: SelectOptionInterface[];

  vehicleOwners: SelectOptionInterface[];
  activeVehicleOwner: SelectOptionInterface[];

  staff: SelectOptionInterface[];
  activeStaff: SelectOptionInterface[];

  // notificationStatus: SelectOptionInterface[];
  // activeNotificationStatus: SelectOptionInterface[];

  private value = {};

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.getDrivers();
    this.getStaff();
    this.getVehicleOwners();

    this.addForm = this.formBuilder.group({
      user_type: [""],
      staff_id: [""],
      driver_id: [""],
      vehicle_owner_id: [""],
      message: [""],
      notification_status: [""]
    });
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

  onCreate() {
    const payload = this.addForm.value;
    this.apiService.postNotification(payload).subscribe(data => {
      if (data.success) {
        swal("Record created!", "Record created successfully!", "success");
        console.log(payload);
      }
    });
  }

  Back() {
    this.router.navigate(["/pmt-notifications"]);
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
}
