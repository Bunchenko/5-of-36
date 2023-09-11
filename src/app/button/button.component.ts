import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
  @Input() customClass: string[] = [];
  @Input() customStyles: { [key: string]: string } = {};
  @Output() onClick = new EventEmitter<MouseEvent>();
}
