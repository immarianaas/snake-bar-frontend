import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';
import { WebsocketService } from './websocket.service';

const URL = "ws://localhost:8000/ws/game/222";

export interface Msg {
  tp: string; // type
  data: string;
}


@Injectable({
  providedIn: 'root'
})
export class GameServiceService {
  public messages: Subject<any>;

  constructor(wsService: WebsocketService) { 
    this.messages = <Subject<any>>wsService.connect(URL).map(
      (response: MessageEvent) : Msg => {
        let data = JSON.parse(response.data);
        return {
          tp: data.tp,
          data: data.data
        }
      }
    )
  }
}
