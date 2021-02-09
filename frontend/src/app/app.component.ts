import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as Chart from 'chart.js';
import { WebSocketAPI } from './webSocketApi';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('chart') ctx: ElementRef;

  // public chartLabels = ['6', '8', '10', '12', '14', '16'];
  // public chartData = [0, 25, 45, 32, 50, 32];
  public chartLabels = [];
  public chartData = [];
  public i = 16;
  public subscription;
  public chart;
  public chartSub;

  greeting: any;
  name: string;
  
  constructor(private webSocketAPI: WebSocketAPI) {}

  ngOnInit(): void {
    Chart.defaults.global.elements.line.tension = 0
    this.chart = this.webSocketAPI.subscribeToChartData().subscribe(data => {
      this.handleMessage(data);
    })
  }

  ngAfterViewInit(): void {
    const data = {
      labels: this.chartLabels,
      datasets: [
        {
          data: this.chartData,
          borderColor: '#3e95cd',
          fill: false,
        },
      ],
    };

    this.chart = new Chart(this.ctx.nativeElement.getContext('2d'), {
      type: 'line',
      data,
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
          xAxes: [{
            type: 'time',
            time: {
              unit: 'hour',
              displayFormats: {
                quarter: 'HH MM SS'
            }
            }
          }]
        },
      },
    });

  }

  connect(){
    this.webSocketAPI._connect();
  }


  disconnect(){
    this.webSocketAPI._disconnect();
  }

  sendMessage(){
    this.webSocketAPI._send();
  }

  handleMessage(message){
    const data = (JSON.parse(message.body));
    const date = new Date(parseInt(data.date)).toLocaleString();
    console.log(date)
    this.chart.data.labels.push(date);
    this.chart.data.datasets.forEach((dataset) => {
      dataset.data.push(data.count);
    });
    this.chart.update();
  }


}
