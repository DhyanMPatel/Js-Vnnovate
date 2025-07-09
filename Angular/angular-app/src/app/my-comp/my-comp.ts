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

  buttonClasses ={
    full_width: true,
  }

  changeMessage() {
    this.message = "Message was changed!";
  }
}
