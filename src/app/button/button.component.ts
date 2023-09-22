import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() customClass?: 'primary' | 'secondary' | 'danger';
  @Input() customStyles: { [key: string]: string } = {};
  @Input() isDisabled: boolean = false;
  @Input() routerLinkActive!: 'link-active';
  @Output() onClick = new EventEmitter<MouseEvent>();
}
