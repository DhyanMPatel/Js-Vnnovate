import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReversePipe } from './my-pipe.pipe';
// import { ɵEmptyOutletComponent } from "../../../node_modules/@angular/router/router_module.d";

@Component({
  selector: 'app-my-comp',
  imports: [FormsModule, ReversePipe],
  templateUrl: './my-comp.html',
  styleUrl: './my-comp.css',
  standalone: true,
  encapsulation: ViewEncapsulation.Emulated
})
export class MyComp {
  message: string = "Hello from MyComp!";

  pipeTesting = "Hello World!"; // This is custom Pipe to reverse string

  buttonClasses = "full-width"; // Css style apply when `buttonClasses` assigned to any element as [class] attribute.

  changeMessage() {
    this.message = "Message was changed!";
  }
}
