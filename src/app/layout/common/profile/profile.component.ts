import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
    selector     : 'profile',
    templateUrl  : './profile.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit
{
    constructor(
    )
    {}

    ngOnInit(): void
    {}
}
