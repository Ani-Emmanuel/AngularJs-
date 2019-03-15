import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PmtNotificationsRoutingModule } from "./pmt-notifications-routing.module";
import { PmtNotificationsComponent } from "./pmt-notifications.component";
import { CreateComponent } from "./create/create.component";
import { EditComponent } from "./edit/edit.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { DetailComponent } from "./detail/detail.component";
@NgModule({
  declarations: [
    PmtNotificationsComponent,
    CreateComponent,
    EditComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    PmtNotificationsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule
  ]
})
export class PmtNotificationsModule {}
