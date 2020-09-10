import { Component, OnInit } from '@angular/core';
//import  'lightweight-charts';
import {observations}  from '../../assets/sp500.json';
import {observationsNoJob}  from '../../assets/unempshort.json';
import {observationsJob}  from '../../assets/jopen.json';


 import { createChart ,SeriesDataItemTypeMap, PriceScaleMode, LineStyle, isBusinessDay} from 'lightweight-charts';
import { getHtmlTagDefinition, HtmlTagDefinition } from '@angular/compiler';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  title = 'PortfolioApplication';
  ticker = observations;
  job = observationsJob;
  noJob = observationsNoJob;
  data: Array<any> = new Array;
  dataJob: Array<any> = new Array;
  dataNoJob: Array<any> = new Array;

  ngOnInit(){

this.createGraph()

  }
  constructor(){}

  createGraph(){
    
    var div = document.createElement('div');
    document.body.appendChild(div);

    div.style.justifyContent = 'center';
    div.style.display = 'flex';
    div.style.alignItems = 'flex-start';
    div.style.marginInlineStart = 'baseline';
    // div.style.paddingTop = "0";
    // div.style.paddingBottom = '100px';
    // div.style.paddingBottom = '100px';


    console.log(this.data)
    for(let i = 0; i< this.job.length;i++){
      
      this.dataJob[i] ={time:this.job[i].date,value:this.job[i].value};
    }
    for(let i = 0; i< this.noJob.length;i++){
      const num = (((this.noJob[i].value - 3)/100) * 122.5)
      console.log(num)
      this.dataNoJob[i] ={time:this.noJob[i].date,value:num};
    }
    console.log(this.data)
    var chart = createChart(div, {
      width: 600,
      height: 300,
      
      localization: {
        dateFormat: 'yyyy/MM/dd',
    },
    
      leftPriceScale: {
        autoScale: false,
        borderVisible: true,

        mode: PriceScaleMode.Normal,
        
        borderColor: 'rgba(197, 203, 206, 0.4)',
      },
      timeScale: {
        
        borderColor: 'rgba(197, 203, 206, 0.4)',
      },
      layout: {
        
        backgroundColor: '#1b5067',
        textColor: '#ffffff',
      },
      grid: {
        
        vertLines: {
          color: 'rgba(197, 203, 206, 0.4)',
          style: LineStyle.Dotted,
        },
        horzLines: {
          color: 'rgba(197, 203, 206, 0.4)',
          style: LineStyle.Dotted,
        },
        
        
      },
    });

    chart.timeScale().fitContent();
    var areaSeries = chart.addAreaSeries({
      topColor: 'rgba(67, 83, 254, 0.7)',
      bottomColor: 'rgba(67, 83, 254, 0.3)',
      lineColor: 'rgba(67, 83, 254, 1)',
      lineWidth: 2,
    });
    chart.applyOptions({
      timeScale: {
          rightOffset: 0,
          barSpacing: 100,
          fixLeftEdge: false,
          lockVisibleTimeRangeOnResize: false,
          rightBarStaysOnScroll: true,
          borderVisible: true,
          borderColor: '#fff000',
          visible: true,
          timeVisible: true,
          secondsVisible: false,
          tickMarkFormatter: (time, tickMarkType, locale) => {
              console.log(time);
              //const year = String (isBusinessDay(time) ? time.year : new Date(time * 1000).getUTCFullYear());
              const month = new Date(time * 1000).getMonth().toString;
              //console.log(month)
              return  time.month + "/" + time.day + "/" + time.year
          },
      },
  });

    chart.applyOptions({
      watermark: {
          color: 'rgba(11, 94, 29, 0.4)',
          visible: true,
          text: 'Patrick Gourdet Demo Application',
          fontSize: 24,
          horzAlign: 'left',
          vertAlign: 'bottom',
      },
      
  });
      var areaSeries = chart.addAreaSeries({
        topColor: 'rgba(30, 200, 30, 0.7)',
        bottomColor: 'rgba(67, 83, 254, 0.3)',
        lineColor: 'rgba(67, 83, 254, 1)',

        lineWidth: 2,
      });
  
    var extraSeries = chart.addAreaSeries({
      topColor: 'rgba(255, 192, 0, 0.7)',
      bottomColor: 'rgba(255, 192, 0, 0.3)',
      lineColor: 'rgba(255, 192, 0, 1)',
      lineWidth: 2,
    });
    const lineSeries = chart.addLineSeries();
    areaSeries.setData(this.dataNoJob)
    extraSeries.setData(this.dataJob);
  }

}
