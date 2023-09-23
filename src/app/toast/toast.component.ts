import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { filter } from 'rxjs/operators';
import { PrizeService } from 'src/services/prize.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastComponent implements OnInit {
  @Input() message: string = '';
  @Input() duration: number = 3000;

  protected _visible: boolean = false;

  constructor(
    private _prizeService: PrizeService,
    private _cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this._prizeService.prizes$
      .pipe(filter(v => v !== null))
      .subscribe(prize => {
        this.message = `You won: ${prize}$`;
        this._visible = true;

        this._cd.markForCheck();

        setTimeout(() => {
          this.message = '';
          this._visible = false;
          this._cd.markForCheck();
        }, this.duration);
      });
  }
}
