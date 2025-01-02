import { Component, OnInit } from '@angular/core';

import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../../core/services/user.service';
import { QuestionService } from '../../core/services/question.service';
import { CommonModule } from '@angular/common';


@Component({
  standalone: true,
  imports: [CommonModule,MatMenuModule, MatButtonModule, MatIconModule, MatCardModule, MatTableModule, MatFormFieldModule, MatInputModule],
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  public isQuestionFavorite: boolean = false;
  constructor() { }

  public toggleFavorite() {
    this.isQuestionFavorite = !this.isQuestionFavorite;
  }

  ngOnInit(): void { }
}