import {AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {StorageService} from 'app/core/storage/storage.service';
import {Title} from '@angular/platform-browser';
import {ToastrService} from 'ngx-toastr';
import {User} from 'app/core/user/user.type';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Equipment} from 'app/modules/admin/equipment/types/equipment.type';
import {EquipmentService} from './services/equipment.service';
import {FuseConfirmationService} from '@fuse/services/confirmation';
import {ActivityService} from 'app/modules/admin/activity/services/activity.service';
import {ActivityType} from 'app/modules/admin/activity/types/activity-type.type';
import {MatDrawer} from '@angular/material/sidenav';
import {FuseMediaWatcherService} from '@fuse/services/media-watcher';

@Component({
    selector: 'app-activity',
    templateUrl: './equipment.component.html',
    styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent implements OnInit,AfterViewInit {
    @ViewChild('nameFieldAdd') nameFieldAdd: ElementRef;
    @ViewChild('nameField') nameField: ElementRef;
    @ViewChild('matDrawer', {static: true}) matDrawer: MatDrawer;
    @ViewChild('editField', {read: ElementRef}) editField: ElementRef;
    @ViewChild('equipmentLabel', {read: ElementRef}) equipmentLabel: ElementRef;
    drawerMode: 'side' | 'over';
    equipments: Equipment[];
    activityTypes: ActivityType[];
    selectedEquipment: Equipment | null;
    selectedEquipmentForm: FormGroup;
    createEquipmentForm: FormGroup;
    addingMode = false;
    user: User = this.storageService.getInLocalStorage('user');
    message: string | null = null;
    flashMessage: 'success' | 'error' | null = null;

    constructor(
        private storageService: StorageService,
        private equipmentService: EquipmentService,
        private activityService: ActivityService,
        private toastr: ToastrService,
        private formBuilder: FormBuilder,
        private fuseConfirmationService: FuseConfirmationService,
        private title: Title,
        private renderer2: Renderer2,
        private fuseMediaWatcherService: FuseMediaWatcherService
    ) {
        this.title.setTitle('Équipements - Cyclocount');
    }

    ngOnInit(): void
    {
        this.selectedEquipmentForm = this.formBuilder.group({
            name: [null, Validators.required],
        });
        this.createEquipmentForm = this.formBuilder.group({
            name: [null, Validators.required],
            activity_type_id: [null, Validators.required],
        });

        // Subscribe to media changes
        this.fuseMediaWatcherService.onMediaChange$
            .subscribe(({matchingAliases}) => {
                // Set the drawerMode if the given breakpoint is active
                if ( matchingAliases.includes('lg') ) {
                    this.drawerMode = 'side';
                } else {
                    this.drawerMode = 'over';
                }
            });

        this.getEquipments();
        this.getActivityTypes();
    }

    ngAfterViewInit(): void
    {
        this.renderer2.listen('window', 'click',(e: Event) => {
            if (this.selectedEquipment) {
                const target = (e.target as HTMLElement);

                if (!this.editField.nativeElement.contains(target) &&
                    !target.classList.contains('no-edit')
                ) {
                    this.selectedEquipment = null;
                    this.selectedEquipmentForm.reset();
                }
            }
        });
    }

    getEquipments(): void
    {
        this.equipmentService.getEquipmentsByUser(this.user.id).subscribe({
            next: (equipments) => {
                this.equipments = equipments;
                this.clearAll();
            },
            error: () => {
                this.toastr.error('Il y a eu un problème');
            }
        });
    }

    getActivityTypes(): void
    {
        this.activityService.getActivityTypes().subscribe({
            next: (activityTypes) => {
                this.activityTypes = activityTypes;
            },
            error: () => {
                this.toastr.error('Il y a eu un problème');
            }
        });
    }

    findActivityTypeEquipments(activityType: ActivityType): Equipment[]
    {
        return this.equipments.filter(e => activityType.id === e.activity_type.id);
    }

    editEquipment(equipment: Equipment): void
    {
        this.selectedEquipment = equipment;
        this.selectedEquipmentForm.patchValue(this.selectedEquipment);
        setTimeout(() => {
            this.nameField.nativeElement.focus();
        });
    }

    saveEdit(): void
    {
        const equipment = this.selectedEquipmentForm.getRawValue();
        const equipmentToUpdate = {
            user_id: this.user.id,
            name: equipment.name,
        };

        this.updateEquipment(this.selectedEquipment.id, equipmentToUpdate);
    }

    updateEquipment(equipmentId: number, equipmentToUpdate: any): void
    {
        this.equipmentService.updateEquipment(equipmentId, equipmentToUpdate).subscribe({
            next: () => {
                this.getEquipments();
                this.showFlashMessage('success', 'Équipement modifié');
            },
            error: (err) => {
                this.showFlashMessage('error', err.error.message);
            }
        });
    }

    deleteSelectedEquipment(equipmentId: number): void
    {
        // Open the confirmation dialog
        const confirmation = this.fuseConfirmationService.open({
            title  : 'Supprimer l\'équipement',
            message: 'Êtes-vous sûr de vouloir supprimer l\'équipement ?',
            actions: {
                confirm: {
                    label: 'Supprimer'
                }
            }
        });

        confirmation.afterClosed().subscribe((result) => {
            if (result === 'confirmed')
            {
                // Delete the objective on the server
                this.equipmentService.deleteEquipment(equipmentId).subscribe(() => {
                    this.getEquipments();
                });
            }
        });
    }

    createEquipment(): void
    {
        this.matDrawer.open();
        this.addingMode = true;
        this.createEquipmentForm.reset();
        setTimeout(() => {
            this.nameFieldAdd.nativeElement.focus();
        }, 100);
    }

    addEquipment(): void
    {
        const createEquipmentValues = this.createEquipmentForm.getRawValue();
        const equipmentToCreate = {
            user_id: this.user.id,
            activity_type_id: createEquipmentValues.activity_type_id,
            name: createEquipmentValues.name,
        };

        this.equipmentService.createEquipment(equipmentToCreate).subscribe({
            next: () => {
                this.getEquipments();
                this.showFlashMessage('success', 'Équipement créé');
            },
            error: (err) => {
                this.showFlashMessage('error', err.error.message);
            }
        });
    }

    clearAll(): void
    {
        this.matDrawer.close();
        this.selectedEquipmentForm.reset();
        this.addingMode = false;
        this.selectedEquipment = null;
    }

    /**
     * Show flash message
     */
    showFlashMessage(type: 'success' | 'error', message?: string): void
    {
        // Show the message
        this.flashMessage = type;
        if (message) {
            this.message = message;
        }

        // Hide it after 3 seconds
        setTimeout(() => {
            this.flashMessage = null;
        }, 7000);
    }
}
