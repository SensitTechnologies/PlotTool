import { NgModule, Component, ViewChild, enableProdMode, Injectable} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DxChartModule, DxChartComponent, DxRangeSelectorModule } from 'devextreme-angular';
import { chartService, sData} from './app.service';

@Component({
  styleUrls: ['./app.component.css'],
  selector: 'demo-app',  
  templateUrl: './app.component.html'
})
export class AppComponent {
   //title = 'app';
    //scatdata: mainScatData[];
 
}
