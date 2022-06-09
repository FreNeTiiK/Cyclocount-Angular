import { Component, OnInit } from '@angular/core';
import {StorageService} from 'app/core/storage/storage.service';
import {AuthService} from 'app/core/auth/auth.service';
import {Title} from '@angular/platform-browser';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-annual-objective',
    templateUrl: './annual-objective.component.html'
})
export class AnnualObjectiveComponent implements OnInit {
    constructor(
        private storage: StorageService,
        public auth: AuthService,
        private toastr: ToastrService,
        private title: Title
    ) {
        this.title.setTitle('Objectifs annuels - Cyclocount');
    }

    ngOnInit(): void {
    }
}
