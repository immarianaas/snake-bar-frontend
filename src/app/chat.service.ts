import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';
import { WebsocketService } from './websocket.service';

const CHAT_URL = "ws://localhost:8000/ws/chat";

export interface Message {
  sender: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public messages: Subject<Message>;

  constructor(wsService: WebsocketService) { 
    this.messages = <Subject<Message>>wsService.connect(CHAT_URL).map(
      (response: MessageEvent) : Message => {
        let data = JSON.parse(response.data);
        return {
          sender: data.sender,
          message: data.message
        }
      }
    )
  }
}
