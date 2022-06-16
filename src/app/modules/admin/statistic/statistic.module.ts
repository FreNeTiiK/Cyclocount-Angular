import { NgModule } from '@angular/core';
import { Route } from '@angular/router';
import {StatisticComponent} from 'app/modules/admin/statistic/statistic.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SharedModule } from 'app/shared/shared.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';

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
        MatButtonModule,
        MatButtonToggleModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        MatProgressBarModule,
        MatSortModule,
        MatTableModule,
        MatTooltipModule,
        NgApexchartsModule,
        SharedModule,
        MatFormFieldModule,
        MatSelectModule
    ]
})
export class StatisticModule
{
}
