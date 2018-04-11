import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './cart/cart.component';
import { ItemComponent } from './home/item/item.component';


// import {AuthGuard} from './guards/auth.guard';
// import { NotAuthGuard}  from './guards/notAuth.guard';
// 




const routes: Routes = [
  {
   path: '', component: LoginComponent
  },
  {
   path: 'login',
    component: LoginComponent
     // canActivate:[NotAuthGuard]
},
  {
   path: 'cart',
    component: CartComponent
     // canActivate:[NotAuthGuard]
},
  {
   path: 'home',
    component: HomeComponent
     // canActivate:[NotAuthGuard]
},
  {
   path: 'item/:id',
    component: ItemComponent
     // canActivate:[NotAuthGuard]
},
  { 
    path: '**', 
    component: HomeComponent
  },



];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
