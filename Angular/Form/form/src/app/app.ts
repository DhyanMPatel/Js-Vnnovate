import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: true,
})
export class App {
  protected title = 'Form';

  formData = {
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

  tableData: (typeof this.formData)[] = [];

  handleSubmit = () => {
    this.tableData = [...this.tableData, structuredClone(this.formData)];
    this.resetForm();
  };

  getSelectedSubjects(subjects: any): string {
    return Object.keys(subjects)
      .filter((key) => subjects[key])
      .join(', ');
  }

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
