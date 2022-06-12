import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import {SignInComponent} from './sign-in.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {SharedModule} from 'app/shared/shared.module';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {FuseAlertModule} from '@fuse/components/alert';

const loginRoutes: Route[] = [
    {
        path     : '',
        component: SignInComponent
    }
];

@NgModule({
    declarations: [
        SignInComponent
    ],
    imports: [
        RouterModule.forChild(loginRoutes),
        FuseAlertModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule,
        SharedModule
    ]
})
export class SignInModule
{
}
