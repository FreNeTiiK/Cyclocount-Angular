import {Component, OnInit, ViewChild} from '@angular/core';
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
    dataSource = new MatTableDataSource<Activity>();
    activities: Activity[];
    moment: any = moment;
    selectedActivity: Activity | null = null;
    user: User = this.storageService.getInLocalStorage('user');

    constructor(
        private activityService: ActivityService,
        private storageService: StorageService,
        private _fuseConfirmationService: FuseConfirmationService,
        public auth: AuthService,
        private toastr: ToastrService,
        private title: Title
    ) {
        this.title.setTitle('Activités - Cyclocount');
    }

    ngOnInit(): void
    {
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

    createActivity(): void {}

    getDuration(startDate: string, endDate: string): string {
        const seconds = moment(endDate).diff(moment(startDate), 'seconds');
        return moment.utc(seconds*1000).format('HH[h] mm[min] ss[s]');
    }
}
