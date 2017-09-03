import { Injectable } from '@angular/core';
import { Http, Response,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class FavoritosService {
	url:string;
  	constructor(private _http: Http) { 
  	this.url ='http://localhost:3678/';
  }

  getFavoritos(){
  	return this._http.get(this.url+'getFavoritos')
  						.map(res=>res.json());
  }

    deleteFavoritos(id){
            console.log('URL A BORRAR: '+this.url+'update/'+id)

  	return this._http.delete(this.url+'update/'+id)
  						.map(res=>res.json());
  }

    createFavorito(newFavorite){
  	return this._http.put(this.url+'update',newFavorite)
  						.map(res=>res.json());
  }

}
