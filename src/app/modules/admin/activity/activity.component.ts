import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorIntl} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {StorageService} from 'app/core/storage/storage.service';
import {AuthService} from 'app/core/auth/auth.service';
import {Title} from '@angular/platform-browser';
import {ToastrService} from 'ngx-toastr';
import {ActivityService} from 'app/modules/admin/activity/services/activity.service';
import {User} from 'app/core/user/types/user.type';
import {Activity} from 'app/modules/admin/activity/types/activity.type';
import {customPaginator} from 'app/core/utils/customPaginator';
import moment from 'moment';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EquipmentService} from 'app/modules/admin/equipment/services/equipment.service';
import {Equipment} from 'app/modules/admin/equipment/types/equipment.type';
import {ActivityType} from 'app/modules/admin/activity/types/activity-type.type';
import {MatSelectChange} from '@angular/material/select';
import {Difficulty} from 'app/modules/admin/activity/types/difficulty.type';

@Component({
    selector: 'app-activity',
    templateUrl: './activity.component.html',
    styleUrls: ['./activity.component.scss'],
    providers: [
        { provide: MatPaginatorIntl, useValue: customPaginator() },
    ],
})
export class ActivityComponent implements OnInit {
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild('titleAddField') private titleAddField: ElementRef;
    dataSource = new MatTableDataSource<Activity>();
    activities: Activity[];
    activityTypes: ActivityType[];
    difficulties: Difficulty[];
    equipments: Equipment[];
    moment: any = moment;
    selectedActivity: Activity | null = null;
    selectedActivityForm: FormGroup;
    addingMode = false;
    user: User = this.storageService.getInLocalStorage('user');
    message: string | null = null;
    flashMessage: 'success' | 'error' | null = null;

    constructor(
        private activityService: ActivityService,
        private equipmentService: EquipmentService,
        private storageService: StorageService,
        private _fuseConfirmationService: FuseConfirmationService,
        public auth: AuthService,
        private formBuilder: FormBuilder,
        private toastr: ToastrService,
        private title: Title
    ) {
        this.title.setTitle('Activités - Cyclocount');
    }

    ngOnInit(): void
    {
        this.selectedActivityForm = this.formBuilder.group({
            title: [null, Validators.required],
            userId: [this.user.id, Validators.required],
            equipmentId: ['none'],
            activityTypeId: [null, Validators.required],
            difficultyId: [null],
            description: [null],
            departureTime: [null],
            arrivalTime: [null],
            distance: [null, Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')],
            speedAverage: [null, Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')],
            speedMax: [null, Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')],
            heightDifference: [null],
            powerAverage: [null],
            caloriesConsumed: [null]
        });

        this.getActivitiesTable();
        this.getEquipmentsByUser();
        this.getActivityTypes();
        this.getDifficulties();
    }

    getActivitiesTable(): void
    {
        this.activityService.getActivitiesByUser(this.user.id).subscribe({
            next: (activities) => {
                this.dataSource.data = activities;
                this.activities = activities;
            },
            error: () => {
                this.toastr.error('Il y a eu un problème');
            }
        });
    }

    getEquipmentsByUser(activityTypeId?: number): void
    {
        this.equipmentService.getEquipmentsByUser(this.user.id, activityTypeId).subscribe({
            next: (equipments) => {
                this.equipments = equipments;

                if (this.selectedActivity && this.selectedActivity.equipment) {
                    const selectedActivityEquipment = this.equipments.find(e => e.id === this.selectedActivity.equipment.id);
                    if (!selectedActivityEquipment) {
                        this.selectedActivityForm.patchValue({equipmentId: 'none'});
                    }
                }
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

    getDifficulties(): void
    {
        this.activityService.getDifficulties().subscribe({
            next: (difficulties) => {
                this.difficulties = difficulties;
            },
            error: () => {
                this.toastr.error('Il y a eu un problème');
            }
        });
    }

    toggleDetails(activityId: number): void
    {
        if (this.addingMode) {
            this.cancelAdding();
        }
        // If the activity is already selected...
        if (this.selectedActivity && this.selectedActivity?.id === activityId)
        {
            // Close the details
            this.closeDetails();
            return;
        }

        this.selectedActivity = this.activities.find(item => item.id === activityId) || null;
        this.selectedActivityForm.patchValue({userId: this.selectedActivity.userLink.id});
        this.selectedActivityForm.patchValue({equipmentId: this.selectedActivity.equipment ? this.selectedActivity.equipment.id : 'none'});
        this.selectedActivityForm.patchValue({difficultyId: this.selectedActivity.difficulty?.id});
        this.selectedActivityForm.patchValue({activityTypeId: this.selectedActivity.activityType.id});
        this.selectedActivityForm.patchValue(this.selectedActivity);
    }

    closeDetails(): void
    {
        this.selectedActivity = null;
        this.selectedActivityForm.reset({userId: this.user.id, equipmentId: 'none'});
    }

    deleteSelectedActivity(): void
    {
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title  : 'Supprimer l\'activité',
            message: 'Êtes-vous sûr de vouloir supprimer l\'activité ?',
            actions: {
                confirm: {
                    label: 'Supprimer'
                }
            }
        });

        confirmation.afterClosed().subscribe((result) => {
            if (result === 'confirmed')
            {
                // Delete the activity   on the server
                this.activityService.deleteActivity(this.selectedActivity.id).subscribe(() => {
                    // Close the details
                    this.closeDetails();
                    this.getActivitiesTable();
                });
            }
        });
    }

    createActivity(): void
    {
        this.addingMode = true;
        this.selectedActivityForm.reset({userId: this.user.id, equipmentId: 'none'});

        this.selectedActivity = {
            id: null,
            userLink: this.user,
            activityType: null,
            equipment: null,
            difficulty: null,
            title: null,
            description: null,
            departureTime: null,
            arrivalTime: null,
            distance: null,
            speedAverage: null,
            speedMax: null,
            heightDifference: null,
            powerAverage: null,
            caloriesConsumed: null,
        };

        this.activities.unshift(this.selectedActivity);
        setTimeout(() => {
            this.titleAddField.nativeElement.focus();
        }, 100);
    }

    addActivity(): void
    {
        this.formateFormDates();

        this.activityService.createActivity(this.selectedActivityForm.getRawValue()).subscribe({
            next: () => {
                this.getActivitiesTable();
                this.addingMode = false;
                this.selectedActivityForm.reset({userId: this.user.id, equipmentId: 'none'});
                this.showFlashMessage('success', 'Activité créée');
            },
            error: (err) => {
                this.showFlashMessage('error', err.error.message);
            }
        });
    }

    updateSelectedActivity(): void
    {
        this.formateFormDates();

        this.activityService.updateActivity(this.selectedActivity.id, this.selectedActivityForm.getRawValue()).subscribe({
            next: () => {
                this.getActivitiesTable();
                this.showFlashMessage('success', 'Activité mise à jour');
            },
            error: (err) => {
                this.showFlashMessage('error', err.error.message);
            }
        });
    }

    activityTypeChanged(event: MatSelectChange): void
    {
        this.getEquipmentsByUser(event.value);
    }

    formateFormDates(): void
    {
        const departureDateFormValue = this.selectedActivityForm.get('departureTime').value;
        const arrivalDateFormValue = this.selectedActivityForm.get('arrivalTime').value;
        this.selectedActivityForm.patchValue({departureTime: departureDateFormValue ? moment(departureDateFormValue).format('YYYY-MM-DD HH:mm:ss') : null});
        this.selectedActivityForm.patchValue({arrivalTime: arrivalDateFormValue ? moment(arrivalDateFormValue).format('YYYY-MM-DD HH:mm:ss') : null});
    }

    cancelAdding(): void
    {
        this.addingMode = false;
        this.selectedActivityForm.reset({userId: this.user.id, equipmentId: 'none'});
        this.getActivitiesTable();
    }

    getDuration(startDate: string, endDate: string): string
    {
        const seconds = moment(endDate).diff(moment(startDate), 'seconds');
        return moment.utc(seconds*1000).format('HH[h] mm[min] ss[s]');
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
