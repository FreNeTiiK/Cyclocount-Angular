import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import {ActivityComponent} from 'app/modules/admin/activity/activity.component';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

const activityRoutes: Route[] = [
    {
        path     : '',
        component: ActivityComponent
    }
];

@NgModule({
    declarations: [
        ActivityComponent
    ],
    imports: [
        RouterModule.forChild(activityRoutes),
        CommonModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
    ],
    providers   : [
        {
            provide: MAT_DATE_LOCALE,
            useValue: 'fr-FR'
        },
        {
            provide : MAT_DATE_FORMATS,
            useValue: {
                parse  : {
                    dateInput: 'LL'
                },
                display: {
                    dateInput         : 'LL',
                    monthYearLabel    : 'MMM YYYY',
                    dateA11yLabel     : 'LL',
                    monthYearA11yLabel: 'MMMM YYYY'
                }
            }
        }
    ]
})
export class ActivityModule
{
}
