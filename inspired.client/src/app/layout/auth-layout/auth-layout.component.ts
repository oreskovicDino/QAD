import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    standalone: true,
    imports: [RouterOutlet],
    selector: 'auth-layout',
    templateUrl: './auth-layout.component.html',
    styleUrl:'./auth-layout.component.scss'
})

export class AuthLayoutComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}