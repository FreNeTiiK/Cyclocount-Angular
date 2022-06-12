import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from "../../../../core/user/user.service";
import {User} from "../../../../core/user/types/user.type";
import {StorageService} from "../../../../core/storage/storage.service";
import {AuthService} from "../../../../core/auth/auth.service";

@Component({
    selector       : 'settings-security',
    templateUrl    : './security.component.html',
    encapsulation  : ViewEncapsulation.None,
})
export class SettingsSecurityComponent implements OnInit
{
    securityForm: FormGroup;
    user: User = this.storageService.getInLocalStorage('user');
    message: string | null = null;
    flashMessage: 'success' | 'error' | null = null;

    /**
     * Constructor
     */
    constructor(
        private _formBuilder: FormBuilder,
        private storageService: StorageService,
        private authService: AuthService,
        private userService: UserService
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
        this.securityForm = this._formBuilder.group({
            current_password  : ['', Validators.required],
            new_password      : ['', [Validators.required, Validators.minLength(4)]],
        });
    }

    changePassword(): void
    {
        this.userService.changePasswordUser(this.user.id, this.securityForm.getRawValue()).subscribe({
            next: () => {
                this.authService.logout();
            },
            error: () => {
                this.showFlashMessage('error', 'Le mot de passe actuel est incorrect');
            }
        });
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
