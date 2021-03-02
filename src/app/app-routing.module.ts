import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DrawingComponent } from './drawing/drawing.component';
import { GameComponent } from './game/game.component';
import { NplayergameComponent } from './nplayergame/nplayergame.component';

const routes: Routes = [
  { path: '', component: GameComponent },
  { path: 'draw', component: DrawingComponent },
  { path: 'multi', component: NplayergameComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
