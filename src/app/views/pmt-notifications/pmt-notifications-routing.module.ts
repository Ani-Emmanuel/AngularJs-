import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PmtNotificationsComponent } from "./pmt-notifications.component";
import { EditComponent } from "./edit/edit.component";
import { CreateComponent } from "./create/create.component";
import { DetailComponent } from "./detail/detail.component";

const routes: Routes = [
  {
    path: "",
    component: PmtNotificationsComponent,
    data: { title: "Pmt Notification" }
  },
  {
    path: "create",
    component: CreateComponent,
    data: { title: "Create Notification" }
  },
  {
    path: "edit",
    component: EditComponent,
    data: { title: "Edit Notification" }
  },
  {
    path: "detail",
    component: DetailComponent,
    data: { title: "Detail Notificaion" }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PmtNotificationsRoutingModule {}
