import {sData, chartService, readData,goToInfo, goToHome} from '../app.service'; //needed for service file to work properly
import { Component, OnInit, NgModule, ViewChild, Injectable} from '@angular/core';
import { NgStyle } from '@angular/common';
@Component({
  selector: 'app-homePage',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  innerHeight: any;
  innerWidth: any;
  largeLogo: boolean = true;

  constructor(private goToI:goToInfo, public dataProvider:sData,public goToH:goToHome, private rData:readData, private chartData:chartService) { 
    if(window.innerWidth<=530) {
      this.largeLogo = false;
    }
  }

  ngOnInit() {
  }
  goToChartPage(){
    this.dataProvider.redirectChart=true;
    this.goToH.redirectHome=false;
   // console.log("home"+ this.goToH.redirectHome);
   // console.log("chart"+ this.dataProvider.redirectChart);// true if redirected from home to plot page
    this.goToI.redirectInfo=false;
    this.dataProvider.showToolbar=true;
    //document.getElementById("homeButton").style.color="white";
    this.dataProvider.onHomePage=true;
    this.dataProvider.showChart=false;//chart doesnt appear until user hits plot
 }
    // Gets Height and Width of the browser window in order to adjust the Home Screen and logo accordingly
  getHeight() {
    return this.innerHeight = (window.innerHeight) + "px";
  }

  getWidth() {
    return this.innerWidth = (window.innerWidth) + "px";
  }
}
