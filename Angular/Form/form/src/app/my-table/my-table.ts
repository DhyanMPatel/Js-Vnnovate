// src/app/my-table/my-table.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppService } from '../app-service';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  contact: string;
  gender: string;
  subjects: {
    Maths: boolean;
    Science: boolean;
    Physics: boolean;
    Chemistry: boolean;
    DSA: boolean;
  };
  location: {
    city: string;
  };
  url: string;
  about: string;
}

@Component({
  selector: 'app-my-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-table.html',
  styleUrls: ['./my-table.scss'],
})
export class MyTableComponent {
  tableData: FormData[] = [];

  constructor(private _appService: AppService) {
    this.tableData = _appService.tableData as FormData[];
  }

  getSelectedSubjects(subjects: FormData['subjects']): string {
    return Object.keys(subjects)
      .filter((key) => subjects[key as keyof FormData['subjects']])
      .join(', ');
  }
}
