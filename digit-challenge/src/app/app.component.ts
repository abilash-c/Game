import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  num1: any;
  num2: any;
  num3: any;
  ans: any;
  symbols = ['+', '-', '*', '/'];
  sym1: any = this.symbols[Math.floor(Math.random() * this.symbols.length)];
  sym2: any = this.symbols[Math.floor(Math.random() * this.symbols.length)];
  temp: any;

  constructor() {
    this.callingEval();
  }

  runFirst() {
    if ( this.temp > 0 && !isNaN(this.temp) && Number.isInteger(this.temp)) {
      this.ans = this.temp;
    } else {
      this.callingEval();
    }
  }

  callingEval() {
    this.temp = eval((Math.floor(Math.random() * 9) + 1) + this.sym1 + (Math.floor(Math.random() * 9) + 1) + this.sym2 + (Math.floor(Math.random() * 9) + 1)));
    this.runFirst();
  }

  pressKey(id: any) {
    if (Number.isInteger(id)) {
      if (!this.num1) {
        this.num1 = id;
        console.log( document.getElementById(id.toString()));
        (<HTMLInputElement> document.getElementById(id.toString())).disabled = true;
      } else if (!this.num2) {
        this.num2 = id;
        (<HTMLInputElement> document.getElementById(id.toString())).disabled = true;
      } else if (!this.num3) {
        this.num3 = id;
        (<HTMLInputElement> document.getElementById(id.toString())).disabled = true;
        if (eval(this.num1 + this.sym1 + this.num2 + this.sym2 + this.num3) === this.ans) {
          window.alert('success');
        }
      }
    } else {
      if (this.num3) {
        console.log(document.getElementById(this.num3.toString()));
        (<HTMLInputElement> document.getElementById(this.num3.toString())).disabled = false;
        this.num3 = undefined;
      } else if (this.num2) {
        (<HTMLInputElement> document.getElementById(this.num2.toString())).disabled = false;
        this.num2 = undefined;
      } else if (this.num1) {
        (<HTMLInputElement> document.getElementById(this.num1.toString())).disabled = false;
        this.num1 = undefined;
      }
    }
  }
}
