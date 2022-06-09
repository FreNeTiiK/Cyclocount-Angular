import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorIntl, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {StorageService} from 'app/core/storage/storage.service';
import {AuthService} from 'app/core/auth/auth.service';
import {Title} from '@angular/platform-browser';
import {ToastrService} from 'ngx-toastr';
import {ActivityService} from 'app/modules/admin/activity/services/activity.service';
import {User} from 'app/core/user/user.type';
import {Activity} from 'app/modules/admin/activity/types/activity.type';
import {customPaginator} from 'app/core/utils/customPaginator';
import moment from 'moment';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivityPush} from 'app/modules/admin/activity/types/activity-push.type';

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
    // @ViewChild(MatSort) private sort: MatSort;
    @ViewChild('titleAddField') private titleAddField: ElementRef;
    dataSource = new MatTableDataSource<Activity>();
    activities: Activity[];
    moment: any = moment;
    selectedActivity: Activity | null = null;
    selectedActivityForm: FormGroup;
    addingMode = false;
    user: User = this.storageService.getInLocalStorage('user');
    message: string | null = null;
    flashMessage: 'success' | 'error' | null = null;

    constructor(
        private activityService: ActivityService,
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
            id: [null, Validators.required],
            user_id: [this.user.id, Validators.required],
            title: ['', Validators.required],
            description: [''],
            departure_time: [''],
            arrival_time: [''],
            speed_average: ['', Validators.required],
            speed_max: ['', Validators.required],
            height_difference: [''],
            power_average: [''],
            calories_consumed: ['']
        });

        this.getActivitiesTable();
    }

    getActivitiesTable(): void {
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

    toggleDetails(activityId: number): void {
        // If the product is already selected...
        if ( this.selectedActivity && this.selectedActivity.id === activityId )
        {
            // Close the details
            this.closeDetails();
            return;
        }

        this.selectedActivity = this.activities.find(item => item.id === activityId) || null;
        this.selectedActivityForm.patchValue(this.selectedActivity);
    }

    closeDetails(): void
    {
        this.selectedActivity = null;
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
            if ( result === 'confirmed' )
            {
                // Delete the product on the server
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

        const newActivity = {
            id: null,
            user_link: this.user,
            title: null,
            description: null,
            departure_time: null,
            arrival_time: null,
            speed_average: null,
            speed_max: null,
            height_difference: null,
            power_average: null,
            calories_consumed: null,
        };

        this.selectedActivity = newActivity;

        this.selectedActivityForm.patchValue(newActivity);
        this.activities.unshift(newActivity);
        setTimeout(() => {
            this.titleAddField.nativeElement.focus();
        });
    }

    getDuration(startDate: string, endDate: string): string {
        const seconds = moment(endDate).diff(moment(startDate), 'seconds');
        return moment.utc(seconds*1000).format('HH[h] mm[min] ss[s]');
    }

    saveAdd(): void {
        const activity = this.selectedActivityForm.getRawValue();
        const activityToCreate: ActivityPush = this.getActivityToPush(activity);

        this.activityService.createActivity(activityToCreate).subscribe({
            next: () => {
                this.getActivitiesTable();
                this.addingMode = false;
                this.selectedActivityForm.reset();
                this.showFlashMessage('success', 'Activité créée');
            },
            error: (err) => {
                this.showFlashMessage('error', err.error.message);
            }
        });
    }

    updateSelectedActivity(): void {
        const activity = this.selectedActivityForm.getRawValue();
        const activityToUpdate: ActivityPush = this.getActivityToPush(activity);

        this.activityService.updateActivity(activity.id, activityToUpdate).subscribe({
            next: () => {
                this.getActivitiesTable();
                this.showFlashMessage('success', 'Activité mise à jour');
            },
            error: (err) => {
                this.showFlashMessage('error', err.error.message);
            }
        });
    }

    getActivityToPush(activity: Activity): ActivityPush {
        return {
            user_id: this.user.id,
            title: activity.title,
            description: activity.description,
            departure_time: moment(activity.departure_time).format('YYYY-MM-DD HH:mm:ss'),
            arrival_time: moment(activity.arrival_time).format('YYYY-MM-DD HH:mm:ss'),
            speed_average: activity.speed_average,
            speed_max: activity.speed_max,
            height_difference: activity.height_difference,
            power_average: activity.power_average,
            calories_consumed: activity.calories_consumed
        };
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

    cancelAdd(): void {
        this.addingMode = false;
        this.getActivitiesTable();
    }
}