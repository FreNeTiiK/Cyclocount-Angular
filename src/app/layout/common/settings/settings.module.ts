import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Route, RouterModule} from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FuseDrawerModule } from '@fuse/components/drawer';
import { MatButtonModule } from '@angular/material/button';
import {SettingsComponent} from 'app/layout/common/settings/settings.component';
import {SettingsAccountComponent} from 'app/layout/common/settings/account/account.component';
import {SettingsAppComponent} from 'app/layout/common/settings/app/app.component';
import {SettingsSecurityComponent} from 'app/layout/common/settings/security/security.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatFormFieldModule} from "@angular/material/form-field";
import {SharedModule} from "../../../shared/shared.module";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatMomentDateModule} from "@angular/material-moment-adapter";
import {MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";

const settingsRoutes: Route[] = [
    {
        path     : '',
        component: SettingsComponent
    }
];

@NgModule({
    declarations: [
        SettingsComponent,
        SettingsAccountComponent,
        SettingsAppComponent,
        SettingsSecurityComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(settingsRoutes),
        MatIconModule,
        MatTooltipModule,
        FuseDrawerModule,
        MatButtonModule,
        MatSidenavModule,
        MatFormFieldModule,
        SharedModule,
        MatInputModule,
        MatSelectModule,
        MatSlideToggleModule,
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
    exports     : [
        SettingsComponent
    ]
})
export class SettingsModule
{
}
