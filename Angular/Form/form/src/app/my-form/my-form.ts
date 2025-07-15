// src/app/my-form/my-form.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppService } from '../app-service';
import { Router } from '@angular/router';

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
  selector: 'app-my-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './my-form.html',
  styleUrls: ['./my-form.scss']
})
export class MyFormComponent {
  formData: FormData;
  tableData: FormData[] = [];

  constructor(private _appService: AppService, private router: Router) {
    this.formData = structuredClone(_appService.formData) as FormData;
    this.tableData = _appService.tableData as FormData[];
  }

  handleSubmit = () => {
    this.tableData = [...this.tableData, structuredClone(this.formData)];
    this._appService.tableData = this.tableData; // Update service data
    this.resetForm();

    this.router.navigate(['/table']);
  };

  resetForm = () => {
    this.formData = {
      firstName: '',
      lastName: '',
      email: '',
      contact: '',
      gender: '',
      subjects: {
        Maths: false,
        Science: false,
        Physics: false,
        Chemistry: false,
        DSA: false,
      },
      location: {
        city: 'Select',
      },
      url: '',
      about: '',
    };
  };
}
