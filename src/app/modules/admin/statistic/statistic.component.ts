import { Component, OnInit } from '@angular/core';
import {StorageService} from 'app/core/storage/storage.service';
import {AuthService} from 'app/core/auth/auth.service';
import {Title} from '@angular/platform-browser';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-statistic',
    templateUrl: './statistic.component.html'
})
export class StatisticComponent implements OnInit {
    constructor(
        private storage: StorageService,
        public auth: AuthService,
        private toastr: ToastrService,
        private title: Title
    ) {
        this.title.setTitle('Statistiques - Cyclocount');
    }

    ngOnInit(): void {
    }
}
