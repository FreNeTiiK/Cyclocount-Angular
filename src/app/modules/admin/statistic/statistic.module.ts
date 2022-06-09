import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import {StatisticComponent} from 'app/modules/admin/statistic/statistic.component';

const statisticRoutes: Route[] = [
    {
        path     : '',
        component: StatisticComponent
    }
];

@NgModule({
    declarations: [
        StatisticComponent
    ],
    imports: [
        RouterModule.forChild(statisticRoutes),
    ]
})
export class StatisticModule
{
}
