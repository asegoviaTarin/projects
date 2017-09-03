import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.services';
import { Router } from '@angular/router';
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styles: []
})
export class HeroesComponent implements OnInit {
  heroes:any;
  buscar:string='a';

  constructor(private _heroesService: HeroesService,
              private _router:Router) { 

  }

  ngOnInit() {
  	this.heroes=this._heroesService.getHeroes();

  	console.log(this.heroes)
  }

  ngOnChanges() {
    this.buscar= this._heroesService.buscar;
  }
  

  verHeroe(idx:number){
    console.log(idx)
    this._router.navigate(['/heroeDetail',idx])
  }

  

}
