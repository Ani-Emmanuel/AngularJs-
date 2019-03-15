import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SettingsComponent } from "./settings.component";
import { UpdateSettingsComponent } from "./update-settings/update-settings.component";

const routes: Routes = [
  {
    path: "",
    component: SettingsComponent,
    data: { title: "PMT Settins" }
  },
  {
    path: "edit",
    component: UpdateSettingsComponent,
    data: { title: "Update Settings" }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule {}
