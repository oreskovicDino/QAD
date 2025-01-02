import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { AppHeaderComponent } from "./app-header/app-header.component";
import { AppNavigationComponent } from './app-navigation/app-navigation.component';

@Component({
    standalone: true,
    imports: [RouterOutlet, AppHeaderComponent, AppNavigationComponent],
    selector: 'main-layout',
    templateUrl: './main-layout.component.html',
    styleUrl: './main-layout.component.scss'
})

export class MainLayoutComponent implements OnInit {
    constructor(private authService: AuthService, private router: Router) { }
    ngOnInit() { }
}