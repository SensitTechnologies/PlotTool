import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NgModule,Component, ViewChild, enableProdMode } from '@angular/core';
import { chartService, sData, readData, goToInfo, goToHome} from './app.service';    //needed for service file to work properly
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DxChartModule, DxChartComponent, DxRangeSelectorModule } from 'devextreme-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule } from '@angular/material';
import { HttpModule } from '@angular/http';
import { FormsModule,FormControl } from '@angular/forms';
import { CommonModule, NgSwitch } from '@angular/common';
import { ChartComponent } from './chart/chart.component';
import { ParseComponent } from './parse/parse.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import {GrowlModule} from 'primeng/primeng';
import { InfoPageComponent } from './info-page/info-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SelectItem, DropdownModule, MultiSelectModule, CheckboxModule} from 'primeng/primeng';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { ChartModule } from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import * as highcharts from 'highcharts';

//declare var require : any;

//import {MessageService} from 'primeng/components/common/messageservice';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    ChartComponent,
    ParseComponent,
    InfoPageComponent,
    HomePageComponent
  ],
  imports: [
    ChartModule,
    BrowserModule,       
    MultiSelectModule,
    DxChartModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    MdButtonModule, 
    MdCardModule, 
    MdMenuModule, 
    MdToolbarModule,
    MdIconModule,
    CommonModule,
    CheckboxModule,
    DxRangeSelectorModule,
    DropdownModule,
    MultiselectDropdownModule,
    GrowlModule
  ],
  providers: [chartService, sData, readData,goToInfo, goToHome, { provide: HighchartsStatic, useValue: highcharts}], //needed for service file to work properly
  bootstrap: [AppComponent]
})
export class AppModule { }
platformBrowserDynamic().bootstrapModule(AppModule);

