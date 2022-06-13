import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from 'app/core/user/types/user.type';
import {StorageService} from 'app/core/storage/storage.service';
import moment from 'moment';
import {UserService} from 'app/core/user/user.service';
import {AuthService} from "../../../../core/auth/auth.service";

@Component({
    selector       : 'settings-account',
    templateUrl    : './account.component.html',
    encapsulation  : ViewEncapsulation.None,
})
export class SettingsAccountComponent implements OnInit
{
    accountForm: FormGroup;
    user: User = this.storageService.getInLocalStorage('user');
    message: string | null = null;
    flashMessage: 'success' | 'error' | null = null;

    /**
     * Constructor
     */
    constructor(
        private _formBuilder: FormBuilder,
        private authService: AuthService,
        private userService: UserService,
        private storageService: StorageService
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
        // Create the form
        this.accountForm = this._formBuilder.group({
            first_name    : [this.user.first_name, Validators.required],
            last_name    : [this.user.last_name, Validators.required],
            username: [this.user.username, Validators.required],
            birthday   : [moment(this.user.birthday, 'YYYY-DD-MM')],
            address   : [this.user.address],
        });
    }

    saveUser(): void
    {
        this.formateFormDates();
        const needNewToken = this.accountForm.get('username').value !== this.user.username;

        this.userService.updateUser(this.user.id, this.accountForm.getRawValue()).subscribe({
            next: (updatedUser) => {
                this.showFlashMessage('success', 'Utilisateur modifié');
                this.storageService.setInLocalStorage('user', updatedUser);

                if (needNewToken === true) {
                    this.authService.logout();
                }
            },
            error: (err) => {
                this.showFlashMessage('error', err.error.message || err.message);
            }
        });
    }

    formateFormDates(): void
    {
        const birthdayFormValue = this.accountForm.get('birthday').value;
        this.accountForm.patchValue({birthday: birthdayFormValue ? moment(birthdayFormValue).format('YYYY-MM-DD') : null});
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
        }, 5000);
    }
}
