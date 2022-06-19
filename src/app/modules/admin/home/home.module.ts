import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import {HomeComponent} from 'app/modules/admin/home/home.component';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {CommonModule} from '@angular/common';
import {NgApexchartsModule} from 'ng-apexcharts';
import {AnimatedDigitComponent} from 'app/core/animated-digit/animated-digit.component';

const homeRoutes: Route[] = [
    {
        path     : '',
        component: HomeComponent
    }
];

@NgModule({
    declarations: [
        HomeComponent,
        AnimatedDigitComponent
    ],
    imports: [
        RouterModule.forChild(homeRoutes),
        MatButtonModule,
        MatMenuModule,
        MatIconModule,
        CommonModule,
        NgApexchartsModule,
    ]
})
export class HomeModule
{
}
