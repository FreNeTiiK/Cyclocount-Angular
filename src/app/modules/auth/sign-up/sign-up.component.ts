import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthService} from 'app/core/auth/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {
    AbstractControl,
    AsyncValidatorFn,
    FormBuilder,
    FormGroup,
    Validators
} from '@angular/forms';
import {StorageService} from 'app/core/storage/storage.service';
import {Title} from '@angular/platform-browser';
import {FuseAlertType} from '@fuse/components/alert';
import {fuseAnimations} from '@fuse/animations';
import {UserService} from 'app/core/user/user.service';
import {CommunicationService} from 'app/core/communication/communication.service';
import {User} from 'app/core/user/types/user.type';
import {map, Observable} from 'rxjs';
import moment from "moment";


@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-up.component.html',
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class SignUpComponent implements OnInit {
    signUpForm: FormGroup;
    alert: { type: FuseAlertType; message: string };
    showAlert: boolean = false;

    constructor(
        public auth: AuthService,
        private router: Router,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private storage: StorageService,
        private userService: UserService,
        private communicationService: CommunicationService,
        private title: Title,
    ) {
        this.title.setTitle('Connexion - Cyclocount');
        if (this.auth.loggedIn()) {
            this.router.navigate(['home']);
        }
    }

    ngOnInit(): void
    {
        this.signUpForm = this.formBuilder.group({
            'first_name': [null, Validators.required],
            'last_name': [null, Validators.required],
            'username': [null, Validators.required, this.checkUsernameIsTaken()],
            'password': [null, [Validators.required, Validators.minLength(4)]],
            'birthday': [null],
            'address': [null],
        });
    }

    signUp(): void
    {
        // Do nothing if the form is invalid
        if ( this.signUpForm.invalid )
        {
            return;
        }

        // Disable the form
        this.signUpForm.disable();

        // Hide the alert
        this.showAlert = false;

        this.formateFormDates();

        // Sign up
        this.auth.signUp(this.signUpForm.getRawValue()).subscribe({
            next: (res) => {
                if (res.token && res.user) {
                    localStorage.setItem('token', res.token);
                    this.storage.setInLocalStorage<User>('user', res.user);
                    this.router.navigateByUrl('/home');
                } else {
                    this.signUpForm.enable();

                    // Set the alert
                    this.alert = {
                        type   : 'error',
                        message: 'Il y a eu un problème'
                    };

                    // Show the alert
                    this.showAlert = true;
                }
            },
            error: (err) => {
                console.log(err);
                // Re-enable the form
                this.signUpForm.enable();

                // Set the alert
                this.alert = {
                    type   : 'error',
                    message: err.error.message || err.message
                };

                // Show the alert
                this.showAlert = true;
            }
        });
    }

    formateFormDates(): void
    {
        const birthdayFormValue = this.signUpForm.get('birthday').value;
        this.signUpForm.patchValue({birthday: birthdayFormValue ? moment(birthdayFormValue).format('YYYY-MM-DD') : null});
    }

    checkUsernameIsTaken(): AsyncValidatorFn {
        return (control: AbstractControl): Observable<{usernameIsTaken: boolean}> =>
            this.userService.checkIfUsernameExists(control.value).pipe(
                map(user => user ? {usernameIsTaken: true} : null)
            );
    }
}
