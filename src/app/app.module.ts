import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CardComponent } from './card/card.component';
import { ButtonComponent } from './button/button.component';
import { DrawingComponent } from './drawing/drawing.component';
import { MmssPipe } from 'src/pipes/mmss.pipe';
import { ToastComponent } from './toast/toast.component';
import { BallComponent } from './ball/ball.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    CheckoutComponent,
    CardComponent,
    ButtonComponent,
    DrawingComponent,
    MmssPipe,
    ToastComponent,
    BallComponent,
    ModalComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
