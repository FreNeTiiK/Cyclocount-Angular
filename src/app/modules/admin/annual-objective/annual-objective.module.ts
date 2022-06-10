import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import {AnnualObjectiveComponent} from 'app/modules/admin/annual-objective/annual-objective.component';
import {MatIconModule} from "@angular/material/icon";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../../shared/shared.module";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";

const annualObjectiveRoutes: Route[] = [
    {
        path     : '',
        component: AnnualObjectiveComponent
    }
];

@NgModule({
    declarations: [
        AnnualObjectiveComponent
    ],
    imports: [
        RouterModule.forChild(annualObjectiveRoutes),
        MatIconModule,
        CommonModule,
        SharedModule,
        MatFormFieldModule,
        MatInputModule,
        MatTooltipModule,
        MatSelectModule,
        MatButtonModule,
    ]
})
export class AnnualObjectiveModule
{
}
