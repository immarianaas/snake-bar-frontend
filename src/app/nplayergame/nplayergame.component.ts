import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Canvas } from '../canvas';
import { ChatService, Message } from '../chat.service';
import { Direction, GameKey } from '../enums';
import { Food } from '../food';
import { Grid } from '../grid';
import { Position } from '../position';
import { Snake } from '../snake';
import { Game } from '../game';
import { GameServiceService } from '../game-service.service';
import { WebsocketService } from '../websocket.service';
import { OnlineGame } from '../onlinegame';

@Component({
  selector: 'app-nplayergame',
  templateUrl: './nplayergame.component.html',
  styleUrls: ['./nplayergame.component.css'],
  providers: [WebsocketService, GameServiceService]

})
export class NplayergameComponent implements OnInit {

  @ViewChild('canv', {static: true})
  canv!: ElementRef<HTMLCanvasElement>;

  game !: OnlineGame;

  gs : GameServiceService;

  constructor(gameService : GameServiceService) { this.gs = gameService; }

  ngOnInit(): void {
    this.game = new OnlineGame(this.canv.nativeElement, this.gs);

    this.gs.messages.subscribe(msg => {
      if (msg.tp === 'join') this.game.joinOnline(msg.data);
      if (msg.tp === 'polling') this.game.answerPoll();
      if (msg.tp === 'update') this.game.update(msg.data);
      console.log("resp from websocket: " + JSON.stringify(msg));
      // const mensg = msg.message;
      // this.msgs.push(<Message> {sender: mensg.sender, message: mensg.});
      console.log(msg.message);
      // this.msgs.push(<Message> <unknown>msg.message);

    })
  }

  public join() : void {
    const join_msg = {'type': 'join', 'room_no' : '222'}
    this.gs.messages.next(join_msg);

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
        return;
    }
    this.game.changeDirection(d);
    
  }
}
