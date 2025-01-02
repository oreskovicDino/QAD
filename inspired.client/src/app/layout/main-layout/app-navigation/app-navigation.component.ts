import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';

@Component({
    standalone: true,
    imports: [CommonModule, MatIconModule, MatButtonModule, RouterModule],
    selector: 'app-navigation',
    templateUrl: './app-navigation.component.html',
    styleUrl: './app-navigation.component.scss'
})

export class AppNavigationComponent implements OnInit {
    public currentPage: string = "";

    constructor(private activatedRoute: ActivatedRoute, private router: Router) {
        this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(() => {
                const activeChild = this.getActiveChild(this.activatedRoute);
                this.currentPage = activeChild?.snapshot.data['breadcrumb'] || 'Default Title';
            });
    }

    private getActiveChild(route: ActivatedRoute): ActivatedRoute | null {
        let activeRoute: ActivatedRoute = route;
        while (activeRoute.firstChild) {
            activeRoute = activeRoute.firstChild;
        }
        return activeRoute;
    }

    ngOnInit(): void {

    }
}