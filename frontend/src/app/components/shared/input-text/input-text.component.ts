import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

interface input {
  placeholder: string;
  type: string;
  value?: string;
  maxlength?: number;
  min?: number;
  max?: number;
}

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.css']
})
export class InputTextComponent implements OnInit {

  @Output() value = new EventEmitter();
  @Input() inputArg!: input;
  
  constructor() {
  }
  
  ngOnInit(): void {
    if (!this.inputArg.maxlength) {
      this.inputArg.maxlength = 255;
    }
    if (!this.inputArg.value) {
      this.inputArg.value = '';
    }
  }

  out(a:string) {
    this.value.emit(a);
  }

}
