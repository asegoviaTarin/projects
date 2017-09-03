import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {HeroesComponent} from './components/heroes/heroes.component';
import {AboutComponent} from './components/about/about.component';
import {HeroeComponent} from './components/heroe/heroe.component';



 const ROUTES: Routes = [
  { path: 'home',      component: HomeComponent },
  { path: 'about',      component: AboutComponent },
  { path: 'heroes',      component: HeroesComponent },
  { path: 'heroeDetail/:id',      component: HeroeComponent },

  { path: '**',    pathMatch: 'full', redirectTo: 'home' }
];

export const APP_ROUTING = RouterModule.forRoot(ROUTES, { useHash:true });