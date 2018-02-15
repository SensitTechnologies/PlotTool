import {sData, chartService, readData,goToInfo, goToHome} from '../app.service'; //needed for service file to work properly
import { Component, OnInit, NgModule, ViewChild, Injectable} from '@angular/core';

@Component({
  selector: 'app-infoPage',
  templateUrl: './info-page.component.html',
  styleUrls: ['./info-page.component.css']
})
export class InfoPageComponent implements OnInit {

  constructor(private goToI:goToInfo, private dataProvider:sData, private rData:readData,private goToH:goToHome, private chartData:chartService) { }

  ngOnInit() {
  }

}
