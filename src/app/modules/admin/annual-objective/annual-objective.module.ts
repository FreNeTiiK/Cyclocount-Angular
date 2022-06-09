import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import {AnnualObjectiveComponent} from 'app/modules/admin/annual-objective/annual-objective.component';

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
    ]
})
export class AnnualObjectiveModule
{
}
