import { Component } from '@angular/core';
import { DrawingService } from 'src/services/drawing.service';

@Component({
  selector: 'app-drawing',
  templateUrl: './drawing.component.html',
  styleUrls: ['./drawing.component.css'],
})
export class DrawingComponent {
  constructor(private _drawingService: DrawingService) {}

  onClick() {
    this._drawingService.complete$.next(true);
  }
}
