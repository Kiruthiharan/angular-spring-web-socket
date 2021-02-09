import { AppComponent } from './app.component';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WebSocketAPI {
  webSocketEndPoint = 'http://localhost:8080/ws';
  topic = '/topic/chart-data';
  stompClient: any;
  appComponent: AppComponent;

  private subject = new Subject<any>();

  constructor() {
  }

  _connect() {
    console.log('Initialize WebSocket Connection');
    const ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    const _this = this;
    _this.stompClient.connect(
      {},
      (frame) => {
        _this.stompClient.subscribe(_this.topic, (sdkEvent) => {
          _this.onMessageReceived(sdkEvent);
        });
        // _this.stompClient.reconnect_delay = 2000;
      },
      this.errorCallBack
    );
  }

  _disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    console.log('Disconnected');
  }

  // on error, schedule a reconnection attempt
  errorCallBack(error) {
    console.log('errorCallBack -> ' + error);
    setTimeout(() => {
      this._connect();
    }, 5000);
  }

  _send() {
    this.stompClient.send('/app/chart-init', {});
  }

  onMessageReceived(message) {
    // console.log('Message Recieved from Server :: ' + message);
    this.subject.next(message);
  }

  subscribeToChartData() {
    return this.subject.asObservable();
  }
}
