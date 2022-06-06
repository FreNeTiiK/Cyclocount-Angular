import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatRadioModule} from '@angular/material/radio';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {SharedModule} from 'app/shared/shared.module';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSortModule} from '@angular/material/sort';
import {HomeComponent} from 'app/modules/admin/home/home.component';
import {MatMenuModule} from '@angular/material/menu';

const dashboardRoutes: Route[] = [
    {
        path     : '',
        component: HomeComponent
    }
];

@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        RouterModule.forChild(dashboardRoutes),
        MatGridListModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSidenavModule,
        MatListModule,
        MatToolbarModule,
        MatRadioModule,
        MatTooltipModule,
        MatTableModule,
        MatPaginatorModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        SharedModule,
        MatProgressBarModule,
        MatMenuModule,
        MatSortModule
    ]
})
export class HomeModule
{
}
