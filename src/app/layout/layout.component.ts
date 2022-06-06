import {Component, Inject, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {combineLatest, map, Subject, takeUntil} from 'rxjs';
import {FuseConfigService} from '@fuse/services/config';
import {FuseMediaWatcherService} from '@fuse/services/media-watcher';
import {AppConfig, Theme} from 'app/core/config/app.config';
import {FuseNavigationService} from '@fuse/components/navigation';
import {Layout} from 'app/layout/layout.types';

@Component({
    selector     : 'layout',
    templateUrl  : './layout.component.html',
    styleUrls    : ['./layout.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LayoutComponent implements OnInit, OnDestroy
{
    isScreenSmall: boolean;
    config: AppConfig;
    scheme: string = 'light';
    theme: Theme;
    layout: Layout = 'classic';
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _fuseNavigationService: FuseNavigationService,
        private _activatedRoute: ActivatedRoute,
        @Inject(DOCUMENT) private _document: any,
        private _router: Router,
        private _fuseConfigService: FuseConfigService,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
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
        this._updateLayout();

        // Set the theme and scheme based on the configuration
        combineLatest([
            this._fuseConfigService.config$,
            this._fuseMediaWatcherService.onMediaQueryChange$(['(prefers-color-scheme: dark)', '(prefers-color-scheme: light)'])
        ]).pipe(
            takeUntil(this._unsubscribeAll),
            map(([config, mql]) => {
                if (localStorage.getItem('scheme') !== null) {
                    config.scheme = localStorage.getItem('scheme');
                }
                if (localStorage.getItem('theme') !== null) {
                    config.theme = localStorage.getItem('theme');
                }
                const options = {
                    scheme: config.scheme,
                    theme : config.theme
                };

                localStorage.setItem('scheme', options.scheme);
                localStorage.setItem('theme', options.theme);

                // If the scheme is set to 'auto'...
                if ( config.scheme === 'auto' )
                {
                    // Decide the scheme using the media query
                    options.scheme = mql.breakpoints['(prefers-color-scheme: dark)'] ? 'dark' : 'light';
                }

                return options;
            })
        ).subscribe((options) => {
            // Store the options
            this.scheme = options.scheme;
            this.theme = options.theme;

            // Update the scheme and theme
            this._updateScheme();
            this._updateTheme();
        });

        // Subscribe to config changes
        this._fuseConfigService.config$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((config: AppConfig) => {

                // Store the config
                this.config = config;
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

    /**
     * Update the selected layout
     */
    private _updateLayout(): void
    {
        // Get the current activated route
        let route = this._activatedRoute;
        while ( route.firstChild )
        {
            route = route.firstChild;
        }

        const paths = route.pathFromRoot;
        paths.forEach((path) => {
            // Check if there is a 'layout' data
            if ( path.routeConfig && path.routeConfig.data && path.routeConfig.data.layout )
            {
                // Set the layout
                this.layout = path.routeConfig.data.layout;
            }
        });
    }

    /**
     * Update the selected scheme
     *
     * @private
     */
    private _updateScheme(): void
    {
        // Remove class names for all schemes
        this._document.body.classList.remove('light', 'dark');

        // Add class name for the currently selected scheme
        this._document.body.classList.add(this.scheme);
    }

    /**
     * Update the selected theme
     *
     * @private
     */
    private _updateTheme(): void
    {
        // Find the class name for the previously selected theme and remove it
        this._document.body.classList.forEach((className: string) => {
            if ( className.startsWith('theme-') )
            {
                this._document.body.classList.remove(className, className.split('-')[1]);
            }
        });

        // Add class name for the currently selected theme
        this._document.body.classList.add(this.theme);
    }
}
