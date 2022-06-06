import { NgModule } from '@angular/core';
import { LayoutComponent } from 'app/layout/layout.component';
import { SharedModule } from 'app/shared/shared.module';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {FuseLoadingBarModule} from '../../@fuse/components/loading-bar';
import {FuseNavigationModule} from '../../@fuse/components/navigation';
import {UserModule} from './common/user/user.module';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {ClassicLayoutModule} from 'app/layout/layouts/classic/classic.module';
import {EmptyLayoutModule} from 'app/layout/layouts/empty/empty.module';

const layoutModules = [
    EmptyLayoutModule,
    ClassicLayoutModule,
];

@NgModule({
    declarations: [
        LayoutComponent
    ],
    imports: [
        SharedModule,
        HttpClientModule,
        RouterModule,
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        FuseLoadingBarModule,
        FuseNavigationModule,
        UserModule,
        SharedModule,
        MatSlideToggleModule,
        ...layoutModules
    ],
    exports     : [
        LayoutComponent,
        ...layoutModules
    ]
})
export class LayoutModule
{
}
