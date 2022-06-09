import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import {FuseNavigationItem, FuseNavigationService, FuseVerticalNavigationComponent} from '@fuse/components/navigation';

@Component({
    selector     : 'classic-layout',
    templateUrl  : './classic.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ClassicLayoutComponent implements OnInit, OnDestroy
{
    isScreenSmall: boolean;
    navigationItems: FuseNavigationItem[];
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _fuseNavigationService: FuseNavigationService,
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.getNavigationItems();

        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({matchingAliases}) => {
                // Check if the screen is small
                this.isScreenSmall = !matchingAliases.includes('md');
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    getNavigationItems(): void {
        this.navigationItems = [
            {
                id      : 'home',
                title   : 'Accueil',
                tooltip : 'Accueil',
                type    : 'basic',
                icon    : 'heroicons_outline:home',
                link    : '/home'
            },
            {
                id      : 'activities',
                title   : 'Activités',
                tooltip : 'Activités',
                type    : 'basic',
                icon    : 'feather:activity',
                link    : '/activities'
            },
            {
                id      : 'statistics',
                title   : 'Statistiques',
                tooltip : 'Statistiques',
                type    : 'basic',
                icon    : 'heroicons_outline:chart-pie',
                link    : '/statistics'
            },
            {
                id      : 'equipments',
                title   : 'Équipements',
                tooltip : 'Équipements',
                type    : 'basic',
                icon    : 'mat_outline:sports_basketball',
                link    : '/equipments'
            },
            {
                id      : 'annualObjectives',
                title   : 'Objectifs annuels',
                tooltip : 'Objectifs annuels',
                type    : 'basic',
                icon    : 'feather:target',
                link    : '/annualObjectives'
            },
        ];
    }

    /**
     * Toggle navigation
     *
     * @param name
     */
    toggleNavigation(name: string): void
    {
        // Get the navigation
        const navigation = this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>(name);

        if ( navigation )
        {
            // Toggle the opened status
            navigation.toggle();
        }
    }
}
