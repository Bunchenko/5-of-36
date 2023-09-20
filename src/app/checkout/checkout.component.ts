import { Component } from '@angular/core';
import { BallsService } from 'src/services/balls.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
  constructor(protected _ballsService: BallsService) {}
}
