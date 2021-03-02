import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { DrawingComponent } from './drawing/drawing.component';
import { FormsModule } from '@angular/forms';
import { NplayergameComponent } from './nplayergame/nplayergame.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    DrawingComponent,
    NplayergameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
