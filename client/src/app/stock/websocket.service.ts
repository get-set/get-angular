import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class WebsocketService {

  ws: WebSocket;

  constructor() {
  }

  createObservableWebSocket(url: string): Observable<any> {
    this.ws = new WebSocket(url);
    return new Observable<any>(sink => {
      this.ws.onmessage = ev => sink.next(ev.data);
      this.ws.onerror = ev => sink.error(ev);
      this.ws.onclose = ev => sink.complete();
    });
  }
}
