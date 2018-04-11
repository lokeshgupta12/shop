import { Component, OnInit } from '@angular/core';
import { AuthService} from '../service/auth.service';
import { Router }  from '@angular/router';
import { NgModule } from '@angular/core';

// import { FlashMessagesService } from 'angular2-flash-messages';
 
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor( public authService :AuthService  ,public  router :Router) { }

  ngOnInit() {

  }
onClickLogout(){
	this.authService.logout();
	// this.notificationShow.show('You are logged out!',{cssClass :'alert-info'});
	this.router.navigate(['/home']);

}
}
