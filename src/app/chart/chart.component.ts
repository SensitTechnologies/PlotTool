import { Component, OnInit, NgModule, ViewChild, Injectable} from '@angular/core';
import { sData, chartService, readData, goToInfo, goToHome } from '../app.service';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { SelectItem, DropdownModule } from 'primeng/primeng';

import { ChartModule } from 'angular2-highcharts';

//require('highcharts/modules/exporting');
declare var require : any; //necessary to use 'require'
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',  
  styleUrls: ['./chart.component.css']
})

export class ChartComponent implements OnInit {
  categoriesList:any;
  seriesData:any=[]
  chartTypes:SelectItem[];
  line:string="line";
  bar:string="bar";
  column:string="column";
  type:string;
  scatter:string="scatter";
  temp:any;
  options:object;
  xAxisCategories:any=[];
  tempYdata:any[]=[];
  yData:any[]=[];
  constructor(private dataProvider:sData, private rData:readData, private chartData:chartService,private goToI:goToInfo, private goToH:goToHome) {
    this.dataProvider.plotData=[]; 
    this.xAxisCategories=[];
    this.yData=[];
    this.tempYdata=[];
    this.chartTypes=[];
    this.seriesData=[];
    this.chartTypes.push({label:'Line', value:{id:1, name: 'line', code: 'LINE'}});
    this.chartTypes.push({label:'Column (Vertical)', value:{id:2, name: 'column', code: 'COLUMN'}}); 
    this.chartTypes.push({label:'Scatter', value:{id:3, name: 'scatter', code: 'SCATTER'}});     
    this.chartTypes.push({label:'Bar (Horizontal)', value:{id:4, name: 'bar', code: 'BAR'}});
  }
  ngOnInit(){}
  dataChanger($event){                        //when user selects new chart type, chart reacts
    this.seriesData=[]; //clear data Array so if the user switches between chart type, the previous data is cleared
    this.type=($event.name);     
    this.xAxisCategories=[]; //clear selected X data points

        for(var i=0;i<this.dataProvider.data.length;i++){               //send xAxis Categories/Data [0,1,2.....] to the chart
            this.xAxisCategories.push(this.dataProvider.data[i].arg);           
        }
        console.log(this.dataProvider.ySelection)
        console.log(this.dataProvider.ySelection.length)
        console.log(this.dataProvider.selectedValues2.length)

        for(var p=0;p<this.dataProvider.selectedValues2.length;p++){   //Puts selected Y Data into an array of arrays
                                                                     //...until length of selected Y Values
                for(var i=0;i<this.dataProvider.data.length;i++){    //loop through column and then move to the next row (next yData) 
                    var qp = "y"+p; //i.e. qp=y0
                    this.tempYdata.push(this.dataProvider.data[i][qp]); //grabs columns of selected Y data //Push YData into a temporary array 
                }
                    this.yData.push(this.tempYdata);
                    this.tempYdata=[];//Clear temp Ydata Array in order to grab next Ydata    
                
        }
    
   console.log("arg "+JSON.stringify(this.xAxisCategories));    
   console.log("yData "+JSON.stringify(this.yData));
        var t=0; //variable to increment through the selected Y data that is in YData array or arrays
        for(let dataS of this.dataProvider.selectedValues2){//dataS=[0,2,3,6..] array of selected values
            for(let r of this.dataProvider.ySelection){//All of Y options; r is =[{label:"cities",value:"0"},{label:"adults",value:"1"}...]
                if (r.value==dataS){          //if selected index==the Y options. Push that Y option to be plotted                 
                        this.seriesData.push({name:r.label,data:this.yData[t]});
                        t++;
                    }
                    
                }
            }         
    console.log("final Data: "+JSON.stringify(this.seriesData));

  }  
  plotButtonFalse(){
    //this.plotNow=false;
    this.dataProvider.plotNow=false; //plot data when true
  }
  plotButtonTrue(){//////////////////////////////////////////////After Plot Button pushed

    this.temp=this.dataProvider.xSelection;
    this.dataProvider.plotNow=true; //plot data when true
    this.rData.showHide=false; //all user options hide when false
    this.dataProvider.showDropDown=false; //Chart Options,X and Y drop down chart type selection is DISABLED when false
        
            this.options={              // Function only will be called when plot button clicked
                chart: {
                    type: this.type,
                    zoomType: 'xy'
                },
                title: {
                    text: this.dataProvider.devChartTitle
                },
                legend:{
                    align: 'right',
                    verticalAlign: 'top',
                    layout: 'vertical',
                    x: 0,
                    y: 100
                },
                xAxis: {
                    title: {
                        text: this.dataProvider.xAxisLabel //Xlabel
                    },
                    categories: this.xAxisCategories //X data points
                },
                yAxis: {
                    title: {
                        text: this.dataProvider.yAxisLabel //YLabel
                    }
                },
                series: this.seriesData,
                exporting: {
                    enabled: true
                   //filename:prompt("Enter file name", "Enter file name here") //customize filename for downloaded chart ON CLICK!????
                },
                tooltip:{
                   // formatter:function(){
                     //   return '<b>'+this.series.name+':'+'</b>'+'<br>'+'['+this.x+','+this.y+']';//this.series.name: Column Title    //individual points
                    //}
                    headerFormat: '<span style="font-size:10px"><b>{point.key}</b></span><table>',                         //combined data points in tooltip
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y:.3f}</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                }         
            }
    }

}
           
 /*   for(var p=0;p<this.dataProvider.ySelection.length;p++){   //...until length of selected Y Values
       
        for(var pp=0;pp<=this.dataProvider.selectedValues2.length;pp++){
            if(p==this.dataProvider.selectedValues2[pp]){
                console.log("p:"+p);
                console.log("sel:"+this.dataProvider.selectedValues2[pp])
                for(var i=0;i<this.dataProvider.data.length;i++){    //loop through column and then move to the next row (next yData) 
                    var qp = "y"+p; //i.e. qp=y0
                this.tempYdata.push(this.dataProvider.data[i][qp]); //grabs columns of selected Y data //Push YData into a temporary array 
                }
                this.yData.push(this.tempYdata);
                this.tempYdata=[];//Clear temp Ydata Array in order to grab next Ydata
            }
        }       
    }*/   
     /*this.options={              // Function only will be called when plot button clicked
        chart: {
            type: 'line'
        },
        title: {
            text: 'Fruit Consumption'
        },
        xAxis: {
            categories: ['apple','oranges','pineapples']
        },
        yAxis: {
            title: {
                text: 'Fruit eaten'
            }
        },
        series: [{
            name: 'Jane',
            data: [1, 0, 4]
        }, {
            name: 'John',
            data: [5, 7, 3]
        },
        {
            name: 'Sav',
            data: [50, 70, 30]
        },
        {
            name: 'Mic',
            data: [-5, -7, -3]
        }]
     }*/  