import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Direction, GameKey } from '../enums';
import { Game } from '../game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  @ViewChild('canv', {static: true})
  canv!: ElementRef<HTMLCanvasElement>;

  game !: Game;

  constructor() { }

  ngOnInit(): void {
    this.game = new Game(this.canv.nativeElement);
  }

  public start() : void {
    this.canv.nativeElement.focus();
    this.game.start();
  }

  public reset() : void {
    this.game.reset();
  }


  public pause() : void {
    this.game.pause();
  }

  changeDir(e: number) : void {
    var d: Direction = Direction.NONE;

    switch (e) {
      case GameKey.DOWN:
        d = Direction.DOWN; break;
      case GameKey.UP:
        d = Direction.UP; break;
      case GameKey.LEFT:
        d = Direction.LEFT; break;
      case GameKey.RIGHT:
        d = Direction.RIGHT; break;
    
      default:
        console.error("invalid key");
    }
    this.game.changeDirection(d);
    
  }

}
