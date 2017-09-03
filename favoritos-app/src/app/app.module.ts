import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FavoritosListComponent} from './components/favoritos-list-component/favoritos-list-component.component';
import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    FavoritosListComponent
  ],
  imports: [
    BrowserModule,
    JsonpModule,
    HttpModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
