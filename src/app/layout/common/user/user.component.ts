import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import {IsActiveMatchOptions, Router} from '@angular/router';
import {AuthService} from 'app/core/auth/auth.service';
import {StorageService} from 'app/core/storage/storage.service';
import {User} from 'app/core/user/user.types';
import {CommunicationService} from 'app/core/communication/communication.service';

@Component({
    selector       : 'user',
    templateUrl    : './user.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs       : 'user'
})
export class UserComponent implements OnInit
{
    user: User;
    isActiveMatchOptions: IsActiveMatchOptions;


    /**
     * Constructor
     */
    constructor(
        public auth: AuthService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _storageService: StorageService,
        private _communicationService: CommunicationService,
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
        this.setUser();
        this._communicationService.componentMethodCalled$.subscribe(
            () => {
                this.setUser();
            }
        );
    }

    setUser(): void {
        this.user = this._storageService.getInLocalStorage('user');
    }
}
