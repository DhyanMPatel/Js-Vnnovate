import { Component, ViewChild, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MyComp } from './my-comp/my-comp';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MyComp],
  templateUrl: './app.html',
  styleUrl: './app.css',
  // template: `<h1>Parent Component</h1>
  //   <app-child></app-child>
  //   <button (click)="callChildMethod()">Call Child Method</button>`,
  standalone: true,
})
export class App {
  @ViewChild(MyComp) childComponent!: MyComp; // 

  callChildMethod() {
    if (this.childComponent) {
      this.childComponent.changeMessage();
    }
  }
}
