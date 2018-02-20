import { Component, OnInit, ViewChild, Injectable} from '@angular/core';
import { Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule } from '@angular/material';
import 'rxjs/Rx';
import { SelectItem, DropdownModule } from 'primeng/primeng';
import { sData, chartService, readData, goToInfo, goToHome } from '../app.service';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ChartModule } from 'angular2-highcharts';
import {InputTextModule} from 'primeng/components/inputtext/inputtext';

declare var require : any; //necessary to use 'require'
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  chartTypes:SelectItem[];
  selectedType:string;
  line:string="line";
  bar:string="bar";
  column:string="column";
  type:string;
  scatter:string="scatter";
  myData: Array<any>;
  categoriesList:any;
  seriesData:any=[]
  temp:any;
  options:object;
  xAxisCategories:any=[];
  tempYdata:any[]=[];
  yData:any[]=[];
  wasClicked:boolean=true; //if true, settings button is white (clicked)
 text: string;
  constructor(private http:Http, private goToI:goToInfo, public dataProvider:sData,public goToH:goToHome, private rData:readData, private chartData:chartService){
    this.dataProvider.plotData=[]; 
    this.xAxisCategories=[];
    this.yData=[];
    this.tempYdata=[];
    this.seriesData=[];
    this.http.get('https://jsonplaceholder.typicode.com/photos')
    .map((response:Response)=>response.json())
    .subscribe(res => this.myData = res);
    this.chartTypes=[];

    this.chartTypes.push({label:'Line', value:{id:1, name: 'line', code: 'LINE'}});
    this.chartTypes.push({label:'Column (Vertical)', value:{id:2, name: 'column', code: 'COLUMN'}}); 
    this.chartTypes.push({label:'Scatter', value:{id:3, name: 'scatter', code: 'SCATTER'}});     
    this.chartTypes.push({label:'Bar (Horizontal)', value:{id:4, name: 'bar', code: 'BAR'}});

  
  }
  ngOnInit() {

  }
 goToHomePage(){
  this.goToH.redirectHome=true;
  console.log("home"+this.goToH.redirectHome);
  this.dataProvider.redirectChart=false;
  this.goToI.redirectInfo=false;
  this.dataProvider.showToolbar=false;
  this.dataProvider.onHomePage=false;
  this.dataProvider.onInfoPage=false;
 }
 goToChartPage(){
  this.dataProvider.redirectChart=true;
  this.goToH.redirectHome=false;
  console.log("chart"+ this.dataProvider.redirectChart);
  this.goToI.redirectInfo=false;
  this.dataProvider.showToolbar=true;
  this.dataProvider.onHomePage=true;//home button on=white
  this.dataProvider.onInfoPage=false;
 // document.getElementById("homeButton").style.color="white";
 }
openNav2() {
  document.getElementById("mySidenav2").style.width = "350px";
  document.getElementById("main").style.marginLeft = "350px";
  this.wasClicked=true;//if true, settings button is white (clicked)
  console.log("open2");
}
refresh(){
   
    this.dataProvider.type='';
    this.dataProvider.devChartTitle='';
    this.dataProvider.xAxisLabel='';
    this.xAxisCategories='';
    this.dataProvider.yAxisLabel='';
    this.dataProvider.fileString=[]; //clear old data
   this.options={};
   this.xAxisCategories=[]; //clear x data
   this.selectedType=" "; //chart type refreshed
   this.dataProvider.selectedValues2=[];//Selected Y titles are cleared
   this.dataProvider.values1= [];//Selected X titles is cleared
   this.dataProvider.showDropDown=true;//Choose file, X and Y data options are no longer disabled
   this.dataProvider.showTypes=false; //Axis, title label and chart type aren't available (until next is pushed)
   this.dataProvider.showChart=false;//hide chart
   // this.seriesData=[];
//  this.dataProvider.data=[]; //clear data pushed into seriesData

   this.dataProvider.plotData=[];  //clear
   this.yData=[];//clear array so previous data is no longer there after refresh
   this.tempYdata=[];//clear array so previous data is no longer there after refresh  
}

closeNav2() {
    document.getElementById("mySidenav2").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
    this.wasClicked=false; //if false, settings button is black (unclicked)
//    document.getElementsByClassName("").style.color.hover="white";
  console.log("close2");
}

dataChanger($event){                        //when user selects new chart type, chart reacts
  this.dataProvider.type=($event.name); 
  this.seriesData=[]; //clear data Array so if the user switches between chart type, the previous data is cleared

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
firstToUpperCase(str) { //First letter of string (str) is capitalized
    return str.substr(0, 1).toUpperCase() + str.substr(1);
}
plotButtonTrue(){//////////////////////////////////////////////After Plot Button pushed
    this.dataProvider.showChart=true;
 document.getElementById("mySidenav2").style.width = "0";//close side menu
 document.getElementById("main").style.marginLeft= "0"; //close side menu
 this.wasClicked=false; // settings button in unclicked state (black)
  this.temp=this.dataProvider.xSelection;
  this.dataProvider.plotNow=true; //plot data when true
 // this.rData.showHide=false; //all user options hide when false
  this.dataProvider.showDropDown=false; //Chart Options,X and Y drop down chart type selection is DISABLED when false
          
  this.dataProvider.devChartTitle=this.firstToUpperCase(this.dataProvider.devChartTitle); //First Letter of Title is always Uppercase
  this.dataProvider.xAxisLabel=this.firstToUpperCase(this.dataProvider.xAxisLabel); //First Letter of X Axis Title is always Uppercase
  this.dataProvider.yAxisLabel=this.firstToUpperCase(this.dataProvider.yAxisLabel); //First Letter of Y Axis Title is always Uppercase

          this.options={              // Function only will be called when plot button clicked
              chart: {
                  type: this.dataProvider.type,
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


