import { Component, OnInit, NgModule, ViewChild, Injectable} from '@angular/core';
import { Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Rx';

import { NgSwitch } from '@angular/common';
import { FormsModule,FormControl } from '@angular/forms';
import 'rxjs/Rx';
import {sData, chartService, readData, goToInfo, goToHome} from '../app.service'; //needed for service file to work properly
import { SelectItem, DropdownModule, MultiSelectModule, CheckboxModule} from 'primeng/primeng';
//import {Message} from 'primeng/components/common/api';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';


@Component({
  selector: 'app-parse',
  templateUrl: './parse.component.html',  
  styleUrls: ['./parse.component.css']
})

export class ParseComponent implements OnInit {
  sData:any;
  
  public parsedFileString=[];
  public parsedFileString2=[];
  public dataString=[];
  type:string;
  mainArray:any[]=[];
  mainScatterArray:any[]=[];
  datasets:any[]=[];
  arg: number;
  //msgs: Message[] = [];
  fileSelected:boolean=false;
  fileChosen:string;

  yLabel:string;
  xLabel:string;
  chartTitle;
  tempDataArray:any;

  titleArray:any[]=[];
  tempIcount:number;
  tempTitles:any=[];
  titles:any=[];
  numTitles:number;
  xPlaceHolder:number;
 // private _values1 = [];
//  private _values2 = [];
  private dataIndexed = [];
  selectedCities: string[] = [];
  selectedValues2: any[] = [];
  numSelectedVal2: any[]=[];
 // values1:SelectItem[]=[];
  values2: SelectItem[]=[];
  
  constructor(private dataProvider:sData, private goToH:goToHome, private rData:readData, private chartData:chartService, private goToI:goToInfo) { 
    this.dataProvider.fileString;
    this.parsedFileString;
    this.parsedFileString2;
    this.dataString;
    this.tempDataArray=[];    
    this.titleArray=[];
    this.tempTitles=[];
    this.titles=[];
   }
  ngOnInit(){ }
 
  changeListener($event): void{              //page adapts when user loads a new file, called each time "Choose file" button is click

   this.readThis($event.target);  //page adapts when user loads a new file, called each time "Choose file" button is click????
   this.titleArray=[];//clear TitleArray
  // this._values2 = [];//clear Y data array
   //this._values1 = [];//clear X Data Array
   this.dataProvider.values1=[]; //clear
   this.values2=[];//clear
   this.dataIndexed = [];//clear
  }
  firstDropDownChanged(val: any) {
    this.values2=[];//clear
    this.dataProvider.selectedValues2=[];
    const obj = this.dataProvider.values1[val];//obj = the item that is in val index of this._values1 (has "id" and "val" entries)
    console.log(val, obj); //val is the index of the selected X value
   // console.log(this.titleArray.length)
    
   // console.log(obj.label)
   // console.log(obj.value)
    this.dataProvider.xSelection=obj.label;
    this.dataProvider.xSelectionIndex=obj.value;
    if (!obj) return;
    if(obj.value!=((this.titleArray.length)-1)){ 
      for(var v=0; v<=this.numTitles; v++){ //After X data is selected,remaining titles are options for multiSelect Y drop down
        if (obj.value == v) { //only enters remaining titles once (rather than this.numTitles times)
          for(var counter=0;counter<this.titleArray.length;counter++){    //loop through the array titles
            if(obj.value==counter){ //Looping through all data, if obj.id(Xvalue) is equal to the current column            
                counter++;  //skip that column        
            }           
            this.values2.push({label:this.titleArray[counter],value:counter}); //remaining titles go to Y data array      
          }
          console.log("V2"+JSON.stringify(this.values2))
          this.dataProvider.ySelection=this.values2;

          console.log("ySel"+JSON.stringify(this.dataProvider.ySelection))
          this.xPlaceHolder=obj.value;   //variable that later is used to know which column(obj.id)(index) of data is the X data       
        }      
      }
    }
    else{                     //when user selects last X option from drop down menu; avoids Y Data dropdown adding an additional blank entry.
      for(var v=0; v<=this.numTitles; v++){ //After X data is selected,remaining titles are options for multiSelect Y dropdown
        if (obj.value == v) { //only enters remaining titles once (rather than this.numTitles times)
          for(var counter=0;counter<(this.titleArray.length)-1;counter++){ //loop through the array titles,one less time     
            if(obj.value==counter){ //Looping through all data, if obj.id(Xvalue) is equal to the current column             
                counter++;  //skip that column                    
            }            
            this.values2.push({label:this.titleArray[counter],value:counter}); //remaining titles go to Y data array      
          }
          console.log("V2"+JSON.stringify(this.values2))
          this.dataProvider.ySelection=this.values2;

          console.log("V2"+JSON.stringify(this.dataProvider.ySelection))
          this.xPlaceHolder=obj.value;   //variable that later is used to know which column(obj.id)(index) of data is the X data       
        }      
      }
    } 
  }
     
  readThis(inputValue: any): void { //Choose file uses this
    console.log(this.dataProvider.fileString)
   // console.log(myReader.result)
    this.parsedFileString=[]; //clear
    this.dataProvider.selector=false; //Chart Plots if and only if user selects a new file (clears plot/previous data otherwise) i.e. =true   
    var file: File = inputValue.files[0]; //"Choosefile" button uses this
    var myReader: FileReader = new FileReader(); //reads file, "Choosefile" button uses this
    var fileType = inputValue.parentElement.id; //"Choosefile" button uses this
    myReader.onloadend = (e) => {//This event is triggered each time the reading operation is successfully completed.
      this.dataProvider.plotData=[];  //clear
    
      this.dataString=[];       //clear parsedData from previous upload
      this.dataProvider.fileString = myReader.result; //myReader.result is a String made up of entire uploaded CSV file
     console.log(this.dataProvider.fileString)
      for(var cut=0;this.dataProvider.fileString[cut]!="\n"; cut++){ //Grab titles (letter by letter) until the first newline. (Titles will always be the first line)
        this.tempTitles = this.dataProvider.fileString.slice(0,cut); //Temporary tile array, read only
      }  
      this.tempTitles=this.tempTitles.concat(','); //To detect the last word, a comma had to be attached to the end of the title array(list).
     
      for(var arrayMaker=0;arrayMaker<this.tempTitles.length;arrayMaker++){
        this.titles[arrayMaker]=this.tempTitles[arrayMaker]; //read only array=array that you can make changes to
      }
      
      this.numTitles=(this.tempTitles.match(/,/g) || []).length; //how many commas (#of titles) in uploaded file.
      this.tempIcount=1; //(initialization) 1 not 0 is the second character concatenated to the first    
      var p=0;    
      while(p<this.numTitles){ //numtitles=number of titles, Loop through numTitles times to grab each Title
         for(var q=this.tempIcount;this.titles[q]!=(','); q++){  //iterate until the end of each word (',' = end of each title)
           if(this.titles[q]!='\n'){ //Checking if it is the end of the line (end of all titles)
              if(p==0){ //Title 1
                this.titles[p]=this.titles[p].concat(this.titles[q]); //recursive, "title[0]"=title[0]+title[1]-> title[0,1]=title[0,1]+title[2].......
              }  
              else{//Title "next" picks up where title "prev" left off,
                if(this.tempIcount==q){  //Title 2+ will not repeat the first letter of each word
                  q++;
                }
                this.titles[this.tempIcount]=this.titles[this.tempIcount].concat(this.titles[q]);
              }       
           }
         }
         if(p==0){ //Title 0
            this.titleArray[p]=this.titles[p]; //Final title array
            this.titleArray[p]=this.firstToUpperCase(this.titleArray[p]); //capitalize first letter of the word
        }
         else{ //for p>0  //next word begins where previous word left off in array 
            this.titleArray[p]=this.titles[this.tempIcount]; //Final title array
            this.titleArray[p]=this.firstToUpperCase(this.titleArray[p]); //capitalize first letter of the word
         }
         this.tempIcount=q+1;   //next word begins where previous word left off in array //q+1=>skip comma
         p++;       //next word            
      } 
     // console.log("Title Array: "+this.titleArray)
     

      for(var counter=0;counter<this.titleArray.length;counter++){ //Xvalue drop down options   
         this.dataProvider.values1.push({label:this.titleArray[counter], value:counter})  //push all titles into an array using object notation (label: title,value: index)
      }

      console.log("v1"+JSON.stringify(this.dataProvider.values1));


      this.parsedFileString=this.dataProvider.fileString.split(/\r\n|\n/); //Entire loaded in file //Remove /n, "this.parsedFileString" = a list of entire loaded in CSV file
  
      for(var cuts=this.numTitles;cuts<this.parsedFileString.length;cuts++){ //remove titles from the data
        this.parsedFileString2=this.parsedFileString.slice(1,cuts) //each row after the first(titles row) until the end of the CSV file is an entry into this.parsedFileString2
      } //i.e. ["2,1,1", "5,2,5", "11,3,7", "9,4,9", .....

      for(var i=0;i<this.parsedFileString2.length;i++){          //Parse each row into an array (columns)     
        this.dataString[i]=this.parsedFileString2[i].split(",");  //Array is split at a comma and concatenated together. "this.dataString[1]" is still equal to 2,1,1
      }//i.e. 2,1,1,5,2,5,11,3,7,9,4,9
     // console.log(this.dataString)
      this.mainArray=[];   //clear data      
      
      for(let j=0;j<this.dataString[0].length;j++){  //"dataString[0].length"= # of Columns= "this.numTitles" //Nested for loops iterates through each column
        var data=0;
        var dataArray=[]; //clear data  
        for(let k=0;k<this.dataString.length;k++){ //"this.dataString.length" = # of rows of Data in CSV file(Not including title(s) row)
          var tempData=this.dataString[k][j];
          if(tempData.includes(':')==true){ //if a ':' is found in the string (time format), let it remain a string 
            data=tempData;
          //  continue;        //DO NOT USE Continue! it extracts the correct data but doesnt include it in final data  
          }
          else{
            data = parseFloat(this.dataString[k][j]);      //j variable loops through # of columns, k variable loops through # of rows 
                                         //parseFloat(this.dataString[k][j];) converts a string to a float
          }
          dataArray.push(data);                         //each column is pushed into "dataArray"."dataArray[0]"=1st column of data, "dataArray[1]"=2nd column of data.....
        }
        this.mainArray.push(dataArray); //i.e [[2,5,11,9,8,1,3,15,25,7,6,4],[1,2,3,4,5,6,7,8,9,10,11,12],[1,5,7,9,7,5,3,12,15,11,2,1]] 
                                        //mainArray[i] holds an array of the ith column                               
        }
        this.mainScatterArray=[];   //holds array of an array of objects //clear array
        var scatterData=[];     //temp scatterdata array  //clear array
      
       }
       myReader.readAsText(file); 
    
    }
    typeSetTrue(){ //If Go button is pushed, Plot Types Drop down is shown
      this.dataProvider.showTypes=true; 
  
    }
    loadData(){ //data isnt loaded until after X-value is selected. 
    console.log("selValues "+this.dataProvider.selectedValues2);
    console.log(this.mainArray)
      this.dataProvider.data=[]; //clear array of data
      
      console.log("TA"+this.titleArray.length);         //#columns
      for(let p=0;p<=(this.mainArray[0].length)-1;p++){ //loop through each row; this.mainArray[0].length =  # rows in data (not including title row)
       
        var scatFinal=[]; //holds array of objects 
        var scat:any={arg:this.mainArray[this.xPlaceHolder][p]};    //push selected X column data into Scat arg object. xPlaceHolder=index of selected X column. p=each row
      
        var h=0; //y index number in Scat object
        for(let ySel=0;ySel<this.dataProvider.selectedValues2.length;ySel++){     //this.selectedValues2.length = number of columns remaining after selected X column is removed
          scat["y"+(h)]=this.mainArray[this.dataProvider.selectedValues2[ySel]][p]; //add selected Y data columns to Scat object; 
          h++                                                         //this.selectedValues2[ySel] loops through the index of selected Y columns
        }              
      scatFinal.push(scat);   //push the x-value and each corresponding Ydata point to the ScatFinal array of objects; i.e. [{"arg":2011,"y0":2,"y1":1}]
      /////// this.mainScatterArray.push(scatFinal);   //array of each scat object inside a scatFinal array; i.e [[{"arg":2011,"y0":2,"y1":1}],[{"arg":2012,"y0":5,"y1":2}]]   
      this.mainScatterArray.push(scatFinal[0]);   //array of each scat object inside a scatFinal array; i.e [{"arg":2011,"y0":2,"y1":1},{"arg":2012,"y0":5,"y1":2}]  
                                                      //grab first and only object
      this.dataProvider.data=this.mainScatterArray;   //Set array of objects data equal to a application wide global variable
   ///////   console.log("sF1"+JSON.stringify(scatFinal[0]));
   ///////   console.log("sF2"+JSON.stringify(scatFinal));
      }          
      this.fileSelected=true; //if a file is selected set this equal to true.
      this.dataProvider.selector=this.fileSelected; //If this is true, plot data (application wide global variable)
      console.log("dataProvider.data: "+JSON.stringify(this.dataProvider.data))
      if(this.dataProvider.data.length>0){this.dataGrabber();} //send data to chart, only if data is present
      
      this.dataProvider.showDropDown=true; //Chart Options, X and Y user select drop downs are not disabled (application wide global variable)
      this.dataProvider.plotNow=false;  //Plot data if true, remains false until Plot button is pushed  (application wide global variable)
    }
    changeShowStatus(){ // display/hide All plot options when called
     // this.rData.showHide = !this.rData.showHide; //when called it displays/hides all plot options
      this.rData.showXYDropdown= true;   //Choosefile and X and Y user select dropdowns are shown when true

    }
    setFalse() { //clears plot
      this.dataProvider.selector=false; //plot cant run (application wide global variable)
      this.dataProvider.data=[]; //clears data
      
    } 
    hideThis(){     
     // this.rData.showXYDropdown = false;//Choosefile and X and Y user select dropdowns are hidden/disabled when called
      this.dataProvider.selectChartType=true; //User option to select Chart type is SHOWN
    } 
    firstToUpperCase(str) { //First letter of string (str) is capitalized
      return str.substr(0, 1).toUpperCase() + str.substr(1);
    }
    dataGrabber(){  //send data to chart, plot ONLY after FILE SELECTION
      //this.dataProvider.data=[];
      this.tempDataArray=[]; //clear array (don't append previous data with new data)
      this.dataProvider.plotData=[];//clear array (don't append previous data with new data)
      this.dataProvider.plotData=this.dataProvider.data; 
    }
    
}
      /*for(var i=0;i<this.dataProvider.data.length;i++){          //this.dataProvider.data is an array of array of objects, chart needs array of objects
        for(var j=0;j<this.dataProvider.data.length;j++){
          this.tempDataArray.push(this.dataProvider.data[j][i]);      //grabs data, removes array from array of objects => becomes array of objects (too large in size)  
        }                                                     //[[{"arg":2011,"y0":1,"y1":2}],[{"arg":2012,"y0":2,"y1":5}]] =>[{"arg":2011,"y0":1,"y1":2},{"arg":2012,"y0":2,"y1":5}....,{},{}]                                     
        console.log("temp"+JSON.stringify(this.tempDataArray))
        this.dataProvider.plotData.push(this.tempDataArray[i]) //grabs data => becomes array of objects (accurate size); removes 
      }*/
       //this.dataProvider.data is an array of objects, chart needs array of objects
     // console.log("ChartData: "+JSON.stringify(this.dataProvider.plotData))
 
        //this.dataProvider.pdLength=this.dataProvider.plotData.length; //sets application wide global variable = length of data
      //  this.title();  //user inputs title
     //   this.chartTitle=prompt("Please enter the title of your plot here:","Enter Title");
       // this.xLabel=prompt("Please Enter Your X Axis Label Here:", "Enter Label");    //user inputs X axis label
      //  this.yLabel=prompt("Please Enter Your Y Axis Label Here:", "Enter Label");    //user inputs Y axis label
       
      //  this.chartTitle=this.firstToUpperCase(this.chartTitle); //First Letter of Title is always Uppercase
       // this.xLabel=this.firstToUpperCase(this.xLabel); //First Letter of X Axis Title is always Uppercase
      //  this.yLabel=this.firstToUpperCase(this.yLabel); //First Letter of Y Axis Title is always Uppercase

      //  this.dataProvider.devChartTitle=this.chartTitle;
       // this.dataProvider.xAxisLabel=this.xLabel; //Service variable allows the X Label to be used in other components
      //  this.dataProvider.yAxisLabel=this.yLabel; //Service variable allows the Y Label to be used in other components

/*  
      title(){
        var chartTitle = prompt("Please enter the title of your plot here:","Enter Title");
        chartTitle=this.firstToUpperCase(chartTitle); //First Letter of Title is always Uppercase
        if (chartTitle != null) {
          document.getElementById("title").innerHTML = chartTitle; //ID,inner HTML allows title to be used in other HTMLs
        }   
      }
      min(array: any[]) {         //find the min of any array
      let min = array[0];
      for(let i=0;i<array.length;i++) {
        if(array[i]<min) {
          min = array[i];
        }
      }
      return min;
    }  
    max(array: any[]) {     //find the max of any array
      let max = array[0];
      for(let i=0;i<array.length;i++) {
        if(array[i]>max) {
          max = array[i];
        }
      }
      return max;
    }
    bgColor(){            //back ground color 
    let q=[];
    for(let f=0;f<this.dataString[0].length;f++){   //for however many datasets
       q.push('rgba(255, 99, 132, 0.5)');        //randomize color later
    }         
    return q;
    }  
    randomColors = function() {               //random color generator
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
    } 
    showSuccess() { //message to alert user //No longer used at the moment
        this.msgs = [];
        this.msgs.push({severity:'success', summary:'Alert', detail:'Select '+'"Plot"'+' to plot your data'});
    } */   
       /* var logSizeData;
    
      for(var fir=0;fir<this.mainArray.length;fir++){ //check how larger incoming data points are (to determine exponential type graph)
        for(var sec=0;sec<this.mainArray.length-1;sec++){     
          if(this.mainArray[fir][sec]>=1000){
           console.log(this.mainArray[fir][sec]+" is greater than 1000");
            this.dataProvider.notLarge=false;
            logSizeData=true;
            break;
          }
        }
        console.log("not broken")
      }
      this.dataProvider.logarithmicSize=logSizeData;*/


 // console.log((this.fileString.match(/,/g) || []).length); //how many commas in first line (headings=#commas+1)

     // var titlesSpl=this.fileString.split(",",2);
     //console.log("Headings: "+titlesSpl);
    //var str=this.titles.join();
     //console.log("str"+str);
    /* for(var d=0;this.fileString[d]!='\n'; d++){
      this.titles.push(this.fileString[d]);
     } console.log("title "+this.titles);

    this.tempIcount=1; //(initialization) 1 not 0 is the first character concatenated to another     
    var p=0;    
    while(p<4){ 
       for(var q=this.tempIcount;this.fileString[q]!=(','); q++){  
         if(this.fileString[q]!='\n'){          
            this.titles[p]=this.titles[p].concat(this.fileString[q]);
          //  console.log("titleP1: "+this.titles[p]);  SEE LETTER BY LETTER           
          }
       }
       this.titleArray[p]=this.titles[p];
       
       this.tempIcount=q+1;   //next word begins where previous word left off in array //skip comma
       p++;
    }  */
