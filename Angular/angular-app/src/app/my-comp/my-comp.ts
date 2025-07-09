import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-my-comp',
  imports: [],
  templateUrl: './my-comp.html',
  styleUrl: './my-comp.css',
  standalone: true,
  encapsulation: ViewEncapsulation.Emulated
})
export class MyComp {
  message: string = "Hello from MyComp!";

  buttonClasses = "full-width"; // Css style apply when `buttonClasses` assigned to any element as [class] attribute.

  changeMessage() {
    this.message = "Message was changed!";
  }
}
