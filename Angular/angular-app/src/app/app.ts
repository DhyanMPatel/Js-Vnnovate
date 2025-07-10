import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MyComp } from './my-comp/my-comp';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MyComp, DatePipe],
  templateUrl: './app.html',
  styleUrl: './app.css',
  // template: `<h1>Parent Component</h1>
  //   <app-child></app-child>
  //   <button (click)="callChildMethod()">Call Child Method</button>`,
  standalone: true,
})
export class App {
  @ViewChild(MyComp) childComponent!: MyComp; // Required to collect all methods of MyComp.

  a = 10;
  b = 9;
  arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  user = 'guest';
  today = '2025-07-10';
  callChildMethod() {
    if (this.childComponent) {
      this.childComponent.changeMessage();
    }
  }
}
