import { Route } from '@angular/router';
import {AuthGuard} from 'app/core/auth/auth.guard';
import { LayoutComponent } from 'app/layout/layout.component';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [
    {
        path: '',
        pathMatch : 'full',
        redirectTo: 'home'
    },
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {
                path: 'login',
                loadChildren: () => import('app/modules/auth/login/login.module').then(m => m.LoginModule)
            },
        ]
    },
    {
        path       : '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component  : LayoutComponent,
        children   : [
            {
                // Home
                path: 'home',
                loadChildren: () => import('app/modules/admin/home/home.module').then(m => m.HomeModule)
            },
            {
                // Activities
                path: 'activities',
                loadChildren: () => import('app/modules/admin/activity/activity.module').then(m => m.ActivityModule),
            },
            {
                // Statistics
                path: 'statistics',
                loadChildren: () => import('app/modules/admin/statistic/statistic.module').then(m => m.StatisticModule),
            },
            {
                // Equipment
                path: 'equipments',
                loadChildren: () => import('app/modules/admin/equipment/equipment.module').then(m => m.EquipmentModule),
            },
            {
                // Annual Objectives
                path: 'annualObjectives',
                loadChildren: () => import('app/modules/admin/annual-objective/annual-objective.module').then(m => m.AnnualObjectiveModule),
            },
            /*{
                // Settings
                path: 'settings',
                loadChildren: () => import('app/layout/common/settings/settings.module').then(m => m.SettingsModule)
            },*/
        ]
    },
    // Catch unknown path & redirect
    {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full'
    }
];
