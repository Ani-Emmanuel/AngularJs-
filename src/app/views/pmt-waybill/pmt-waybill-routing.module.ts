import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PmtWaybillComponent } from "./pmt-waybill.component";
import { CreateWaybillComponent } from "./create-waybill/create-waybill.component";
import { EditWaybillComponent } from "./edit-waybill/edit-waybill.component";
import { ViewWaybillComponent } from "./view-waybill/view-waybill.component";

const routes: Routes = [
  { path: "", component: PmtWaybillComponent, data: { title: "PMT Waybill" } },
  {
    path: "create",
    component: CreateWaybillComponent,
    data: { title: "Create Waybill" }
  },
  {
    path: "edit",
    component: EditWaybillComponent,
    data: { title: "Edit Waybill" }
  },
  {
    path: "view",
    component: ViewWaybillComponent,
    data: { title: "View Waybill" }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PmtWaybillRoutingModule {}
