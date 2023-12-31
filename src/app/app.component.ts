import { Component } from '@angular/core';
import { BallsService } from 'src/services/balls.service';
import { DrawingService } from 'src/services/drawing.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = '5-of-36';

  constructor(
    protected drawingService: DrawingService,
    private _ballsService: BallsService
  ) {}
}
