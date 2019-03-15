import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PmtWaybillRoutingModule } from "./pmt-waybill-routing.module";
import { PmtWaybillComponent } from "./pmt-waybill.component";
import { CreateWaybillComponent } from "./create-waybill/create-waybill.component";
import { ViewWaybillComponent } from "./view-waybill/view-waybill.component";
import { EditWaybillComponent } from "./edit-waybill/edit-waybill.component";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";

//import { from } from "rxjs";

@NgModule({
  declarations: [
    PmtWaybillComponent,
    CreateWaybillComponent,
    ViewWaybillComponent,
    EditWaybillComponent
  ],
  imports: [
    CommonModule,
    PmtWaybillRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule
  ]
})
export class PmtWaybillModule {}
