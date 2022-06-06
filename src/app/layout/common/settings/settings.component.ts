import {Component, Inject, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import { Router } from '@angular/router';
import {Subject, takeUntil} from 'rxjs';
import { FuseConfigService } from '@fuse/services/config';
import {AppConfig, Scheme, Theme} from 'app/core/config/app.config';
import {FuseMediaWatcherService} from '@fuse/services/media-watcher';
import {DOCUMENT} from '@angular/common';

@Component({
    selector     : 'settings',
    templateUrl  : './settings.component.html',
    encapsulation: ViewEncapsulation.None
})
export class SettingsComponent implements OnInit, OnDestroy
{
    config: AppConfig;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        @Inject(DOCUMENT) private _document: any,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _router: Router,
        private _fuseConfigService: FuseConfigService
    )
    {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
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
     * Set the scheme on the config
     *
     * @param scheme
     */
    setScheme(scheme: Scheme): void
    {
        localStorage.setItem('scheme', scheme);
        this._fuseConfigService.config = {scheme};
    }

    /**
     * Set the theme on the config
     *
     * @param theme
     */
    setTheme(theme: Theme): void
    {
        localStorage.setItem('theme', theme);
        this._fuseConfigService.config = {theme};
    }
}
