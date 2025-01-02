import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatIconModule, MatMenuModule],
    selector: 'app-header',
    templateUrl: 'app-header.component.html',
    styleUrl: './app-header.component.scss'
})

export class AppHeaderComponent implements OnInit {
    constructor(private authService: AuthService, private router: Router) { }
    public signOut() {
        this.authService.logout().subscribe(() => {
            this.router.navigate(['/auth/login']);
        });
    }
    ngOnInit() { }
}