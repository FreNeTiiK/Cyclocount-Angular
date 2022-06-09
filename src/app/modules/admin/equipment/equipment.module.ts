import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import {EquipmentComponent} from 'app/modules/admin/equipment/equipment.component';

const equipmentRoutes: Route[] = [
    {
        path     : '',
        component: EquipmentComponent
    }
];

@NgModule({
    declarations: [
        EquipmentComponent
    ],
    imports: [
        RouterModule.forChild(equipmentRoutes),
    ]
})
export class EquipmentModule
{
}
