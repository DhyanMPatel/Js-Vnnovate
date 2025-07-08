import { Component } from '@angular/core';

@Component({
  selector: 'app-my-comp',
  imports: [],
  templateUrl: './my-comp.html',
  styleUrl: './my-comp.css',
  standalone: true,
})
export class MyComp {
  message: string = "Hello from MyComp!";

  changeMessage() {
    this.message = "Message was changed!";
  }
}
