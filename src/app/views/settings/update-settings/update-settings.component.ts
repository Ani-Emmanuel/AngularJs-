import { Component, OnInit } from "@angular/core";
import { ApiService, UtilsService } from "../../../_services";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
@Component({
  selector: "app-update-settings",
  templateUrl: "./update-settings.component.html",
  styleUrls: ["./update-settings.component.scss"]
})
export class UpdateSettingsComponent implements OnInit {
  editForm: FormGroup;
  payload: any;
  ID: string;
  constructor(
    private apiservice: ApiService,
    private formBuilder: FormBuilder,
    private router: Router,
    private utilsService: UtilsService
  ) {}

  ngOnInit() {
    //const payloadid = window.localStorage.getItem("SettingWithId");
    const id = window.localStorage.getItem("Settings_id");
    this.ID = id;
    // if (payloadid) {
    //   this.payload = JSON.parse(payloadid);
    //   console.log(this.payload);
    // } else {
    //   this.retrieveSettings(id);
    // }
    this.payload = this.utilsService.cleanObject(this.getSettings(id));
    console.log(this.payload);
    this.editForm = this.formBuilder.group({
      // settings_id: [""],
      value: [""],
      name: [""],
      access: [""],
      category: [""],
      description: [""]
    });

    this.editForm.get("value").setValue(this.payload.value);
    this.editForm.get("name").setValue(this.payload.name);
    this.editForm.get("access").setValue(this.payload.access);
    this.editForm.get("category").setValue(this.payload.category);
    this.editForm.get("description").setValue(this.payload.description);
  }

  getSettings(id) {
    console.log("\nSettings Id", id);
    const storedRecord = window.localStorage.getItem("Settings");
    if (storedRecord) {
      this.payload = JSON.parse(storedRecord);
    }
    const t = this.apiservice.getSetting(this.payload, id);
    return t[0];
  }

  // getRecord(terminalId) {
  //   console.log('\nTerminal Id ', terminalId);
  //   const storedRecords = window.localStorage.getItem('terminal');
  //   const updated = window.localStorage.getItem('terminal_updated');
  //   if (storedRecords) {
  //       this.terminals = JSON.parse(storedRecords);
  //       console.log(`Records retrieved since ${updated}`);
  //   }
  //   const t = this.apiService.getTerminal(this.terminals, terminalId);
  //   return t[0];
  // }

  // retrieveSettings(id: string) {
  //   window.localStorage.removeItem("SettingWithId");
  //   return this.apiservice.retrieveSettings(id).subscribe(data => {
  //     window.localStorage.setItem(
  //       "SettingWithId",
  //       JSON.stringify(data.payload)
  //     );
  //   });
  // }

  UpdateSettings() {
    const payload = this.editForm.value;
    this.apiservice.updateSetting(this.ID, payload).subscribe(data => {
      if (data.success) {
        console.log("Record Updated Successfully");
      }
    });
  }

  Back() {
    this.router.navigate(["settings"]);
  }
}
