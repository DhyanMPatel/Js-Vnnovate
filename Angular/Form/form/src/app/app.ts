import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
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
      maths: false,
      science: false,
      physics: false,
      chemistry: false,
      dsa: false,
    },
    location: {
      city: 'Select',
    },
    url: '',
    about: '',
  };

  tableData: (typeof this.formData)[] = [];

  handleSubmit = () => {
    this.tableData.push(structuredClone(this.formData));
    console.log(this.formData, 'Form Data');
    console.log(this.tableData, 'Table Data');
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
        maths: false,
        science: false,
        physics: false,
        chemistry: false,
        dsa: false,
      },
      location: {
        city: '',
      },
      url: '',
      about: '',
    };
  };
}
