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
      city: '',
    },
    url: '',
    about: '',
  };

  handleSubmit = () => {
    console.log(this.formData);
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
