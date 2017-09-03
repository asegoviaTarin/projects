import { Component, OnInit } from '@angular/core';
import { FavoritosService } from '../../services/favoritos.service';


@Component({
  selector: 'favoritos-list',
  templateUrl: './favoritos-list-component.component.html',
  styleUrls: ['./favoritos-list-component.component.css'],
  providers :[FavoritosService]
})
export class FavoritosListComponent implements OnInit {
  
 public errorMessage;
 favoritos:any=[];
 nuevoFavorito:any={
 	title : '',
 	description :'',
 	url: ''
 }


  constructor(private _favoritoService:FavoritosService) { }

  ngOnInit() {
  	console.log('favortios lis componen cargado!');
  	this.getfavs()
  }

  newFav(){
  	console.log(this.nuevoFavorito)
  	this._favoritoService.createFavorito(this.nuevoFavorito)
  	.subscribe(
  		result =>{
  			
  			console.log('favorito creado!!!');
  			this.getfavs();
  		},
  		error =>{
  			this.errorMessage = <any>error;
  			if(this.errorMessage != null)
  				alert('error')
  		}
  	);


  }

  borrarFav(id){
  		this._favoritoService.deleteFavoritos(id)
  	.subscribe(
  		result =>{
  			console.log('favorito borrado!!!');
  			this.getfavs();
  		},
  		error =>{
  			this.errorMessage = <any>error;
  			if(this.errorMessage != null)
  				console.log(this.errorMessage )
  		}
  	);
  	
  }

  getfavs(){

  	this._favoritoService.getFavoritos()
  	.subscribe(
  		result =>{
  			this.favoritos=result.favoritos;
  			console.log(this.favoritos);
  		},
  		error =>{
  			this.errorMessage = <any>error;
  			if(this.errorMessage != null)
  				alert('error')
  		}
  	);
  }

}
