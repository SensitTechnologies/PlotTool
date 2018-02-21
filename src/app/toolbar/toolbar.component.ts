import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule } from '@angular/material';
import 'rxjs/Rx';
import { InfoPageComponent } from '../info-page/info-page.component';
import {sData, chartService, readData, goToInfo, goToHome} from '../app.service'; //needed for service file to work properly

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  myData: Array<any>;
  constructor(private http:Http, private goToI:goToInfo, private goToH:goToHome, private dataProvider:sData, private rData:readData, private chartData:chartService){
    this.http.get('https://jsonplaceholder.typicode.com/photos')
    .map((response:Response)=>response.json())
    .subscribe(res => this.myData = res);
  }
  ngOnInit() {
  }

 goToInfoPage(){
  this.goToI.redirectInfo=true;
  console.log("info"+this.goToI.redirectInfo);
  this.dataProvider.redirectChart=false;
  this.goToH.redirectHome=false;
  this.dataProvider.showToolbar=true;
 }
 goToHomePage(){
  this.goToH.redirectHome=true;
  console.log("home"+this.goToH.redirectHome);
  this.dataProvider.redirectChart=false;
  this.goToI.redirectInfo=false;
  this.dataProvider.showToolbar=false;
 }
 goToChartPage(){
  this.dataProvider.redirectChart=true;
  this.goToH.redirectHome=false;
  console.log("chart"+ this.dataProvider.redirectChart);
  this.goToI.redirectInfo=false;
  this.dataProvider.showToolbar=true;
 }
 homeAlert(){
   alert("Home");
 }

}
