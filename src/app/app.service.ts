import { ParseComponent } from './parse/parse.component'; //import all components that utilizes this service page

import { ToolbarComponent } from './toolbar/toolbar.component';
import { Injectable } from '@angular/core'; //needed for service file to work properly
import { HomePageComponent } from './home-page/home-page.component';
import { SelectItem
} from 'primeng/primeng';
@Injectable()
export class sData{
   data:any=[]; 
   selector:boolean;  //Plots if and only if user selects a new file (clears plot/previous data otherwise)
   plotData:any=[];
   xAxisLabel:any;
   yAxisLabel:any;
  devChartTitle:any;
  onHomePage:any=false; //on home (plot) page? 
  onInfoPage:any=false; //on info page? 
  type:any;
  fileString:any;
  showChart:boolean=false; //show chart if true
  // pdLength:number;
   redirectChart:boolean=false; //redirect to chart page
   showToolbar:boolean=false;
   notLarge:boolean=true; //data values are not Logarithmic Size if true
   logarithmicSize:boolean=false; //data values are not Logarithmic Size if true
   showDropDown:boolean=true; //enable drop down chart type selection
   plotNow:boolean=false; //Plot data if true
  ySelection:any=[];
  xSelection:any;
  xSelectionIndex:any;
  selectedValues2:any;
  selectChartType:boolean=false;
  showTypes:any=false;
  values1:SelectItem[]=[];//variable that loops through X data title options
} 
@Injectable()
export class goToInfo{
  redirectInfo:boolean=false;    //redirect to Info page
} 
@Injectable()
export class goToHome{
  redirectHome:boolean=true;    //redirect to Home page
} 
let scatData: sData[]=[];
@Injectable()
export class readData{
  showHide:boolean=true;    //variable toggled to show/hide user interacted plot options
  showXYDropdown:boolean=true;
} 
@Injectable()
export class chartService {
  getSDATA(): sData[]{
      return scatData;
  }   
}

