import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthService} from 'app/core/auth/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StorageService} from 'app/core/storage/storage.service';
import {Title} from '@angular/platform-browser';
import {FuseAlertType} from '@fuse/components/alert';
import {fuseAnimations} from '@fuse/animations';
import {UserService} from 'app/core/user/user.service';
import {CommunicationService} from 'app/core/communication/communication.service';
import {User} from 'app/core/user/user.type';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class LoginComponent implements OnInit {
    loginForm!: FormGroup;
    alert: { type: FuseAlertType; message: string };
    showAlert: boolean = false;
    redirectURL: string | undefined;

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

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            'username': ['', Validators.required],
            'password': ['', Validators.required]
        });
    }

    loginUser(): void {
        // Return if the form is invalid
        if (this.loginForm.invalid)
        {
            return;
        }

        // Disable the form
        this.loginForm.disable();

        // Hide the alert
        this.showAlert = false;

        const params = this.route.snapshot.queryParams;
        if (params['redirectURL']) {
            this.redirectURL = params['redirectURL'];
        }

        const credentials = this.loginForm.value;
        this.auth.loginUser(credentials).subscribe({
            next: (res: any) => {
                if (res.token) {
                    localStorage.setItem('token', res.token);
                    this.getUser(credentials.username);
                    this.redirectURL ? this.router.navigateByUrl(this.redirectURL).catch(() => this.router.navigate(['home'])) : this.router.navigate(['home']);
                } else {
                    this.loginForm.enable();

                    // Set the alert
                    this.alert = {
                        type   : 'error',
                        message: 'Il y a eu un problème'
                    };

                    // Show the alert
                    this.showAlert = true;
                }
            },
            error: () => {
                // Re-enable the form
                this.loginForm.enable();

                // Set the alert
                this.alert = {
                    type   : 'error',
                    message: 'Mauvais nom d\'utilisateur ou mot de passe'
                };

                // Show the alert
                this.showAlert = true;
            }
        });
    }

    getUser(username: string): void {
        this.userService.getUserByUsername(username).subscribe(
            (user) => {
                this.storage.setInLocalStorage<User>('user', user);
                this.communicationService.callComponentMethod();
            }
        );
    }
}
