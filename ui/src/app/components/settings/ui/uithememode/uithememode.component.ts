import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-uithememode',
  templateUrl: './uithememode.component.html',
  styleUrls: ['./uithememode.component.css']
})
export class UithememodeComponent implements OnInit {

  @Input() type: 'light' | 'dark' | 'deep-dark';
  @Input() selected;
  @Output() selectedChange = new EventEmitter();
  @HostBinding('class') className: string;

  constructor() { }
  
  ngOnInit(): void {
      this.className = this.type;
  }

}
