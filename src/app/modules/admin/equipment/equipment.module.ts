import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import {EquipmentComponent} from 'app/modules/admin/equipment/equipment.component';
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import {CommonModule} from "@angular/common";
import {MatSelectModule} from "@angular/material/select";
import {SharedModule} from "../../../shared/shared.module";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatDividerModule} from "@angular/material/divider";

const equipmentRoutes: Route[] = [
    {
        path     : '',
        component: EquipmentComponent
    }
];

@NgModule({
    declarations: [
        EquipmentComponent
    ],
    imports: [
        RouterModule.forChild(equipmentRoutes),
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatTooltipModule,
        CommonModule,
        MatSelectModule,
        SharedModule,
        MatSidenavModule,
        MatDividerModule,
    ]
})
export class EquipmentModule
{
}
