import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import {SignUpComponent} from './sign-up.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {SharedModule} from 'app/shared/shared.module';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {FuseAlertModule} from '@fuse/components/alert';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";

const signUpRoutes: Route[] = [
    {
        path     : '',
        component: SignUpComponent
    }
];

@NgModule({
    declarations: [
        SignUpComponent
    ],
    imports: [
        RouterModule.forChild(signUpRoutes),
        FuseAlertModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule,
        SharedModule,
        MatDatepickerModule,
        MatMomentDateModule
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
    ],
})
export class SignUpModule
{
}
