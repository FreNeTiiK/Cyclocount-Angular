import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Route, RouterModule} from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FuseDrawerModule } from '@fuse/components/drawer';
import { ProfileComponent } from 'app/layout/common/profile/profile.component';
import { MatButtonModule } from '@angular/material/button';

const settingsRoutes: Route[] = [
    {
        path     : '',
        component: ProfileComponent
    }
];

@NgModule({
    declarations: [
        ProfileComponent
    ],
    imports     : [
        CommonModule,
        RouterModule.forChild(settingsRoutes),
        MatIconModule,
        MatTooltipModule,
        FuseDrawerModule,
        MatButtonModule
    ],
    exports     : [
        ProfileComponent
    ]
})
export class ProfileModule
{
}
