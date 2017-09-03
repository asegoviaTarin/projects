import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../../services/heroes.services';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private _heroesService: HeroesService) { }

  prueba:string;
  ngOnInit() {
  }

  update(cadena:string){
  	this._heroesService.buscar=cadena;

  }

  buscarHeroe(texto){

  		this._heroesService.buscar=texto;
  		this.prueba=this._heroesService.buscar
  	//console.log("desde el navbar: " + texto)
  }

}
