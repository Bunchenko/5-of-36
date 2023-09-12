import { Component, Input, OnInit } from '@angular/core';
import { PrizeService } from 'src/services/prize.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
})
export class ToastComponent implements OnInit {
  @Input() message: string = '';
  @Input() duration: number = 3000;

  protected _visible: boolean = false;

  constructor(private _prizeService: PrizeService) {}

  ngOnInit() {
    this._prizeService.prizes$.subscribe((prize) => {
      this.message = `You won: ${prize}$`;
      this._visible = true;

      setTimeout(() => {
        this.message = '';
        this._visible = false;
      }, this.duration);
    });
  }
}
