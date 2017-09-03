import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
activar:boolean;

constructor(){
  this.activar=true;
}
  nombre = 'Alberto';
  array = [1,2,3,4,5,6,7,8,9,10];

  PI= Math.PI;

  myNumber= 0.256;

  currencyNumber1:number = 0.259;
  currencyNumber2:number = 1.3495;

  myObject = {
  	nombre:'Alberto',
  	amigos:[{
  		nombre:'uli',
  		edad:23
  	},{
  		nombre:'fabi',
  		edad:23
  	}]
  };

  valorPromesa = new Promise ((resolve,reject)=>{
  	setTimeout(()=>resolve('llegaron los datos'),3500);
  })
  //hemos cambiando el idioma en los privders
  fecha= new Date();

  nombreminus='AlberTo Segovia Tarin'
  video:string='qHPpTiCa_vM'

  
  

}
