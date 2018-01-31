import {Component, OnInit} from '@angular/core';
import {WebsocketService} from '../stock/websocket.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  appTitle = environment.appTitle;

  messageCount = 0;

  constructor(public websocket: WebsocketService) {
  }

  ngOnInit() {
    this.websocket.createObservableWebSocket('ws://localhost:8085')
      .map(event => JSON.parse(event))
      .subscribe(
        event => this.messageCount = event.messageCount
      );
  }

}
