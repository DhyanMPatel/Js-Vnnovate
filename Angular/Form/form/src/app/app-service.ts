// src/app/app-service.ts
import { Injectable } from '@angular/core';

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

@Injectable({
  providedIn: 'root',
})
export class AppService {
  formData: FormData = {
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

  tableData: FormData[] = [];
}
