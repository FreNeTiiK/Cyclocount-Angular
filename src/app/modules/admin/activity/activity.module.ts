import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import {ActivityComponent} from 'app/modules/admin/activity/activity.component';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { NgxMatDatetimePickerModule } from '@angular-material-components/datetime-picker';
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';
import {SharedModule} from 'app/shared/shared.module';
import {MatSelectModule} from "@angular/material/select";

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
        SharedModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        NgxMatDatetimePickerModule,
        MatDatepickerModule,
        MatMomentDateModule,
        MatSlideToggleModule,
        NgxMatMomentModule,
        MatSelectModule
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
