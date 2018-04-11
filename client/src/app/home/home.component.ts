import { Component, OnInit } from '@angular/core';
import { AuthService} from '../service/auth.service';
import { Router }  from '@angular/router';
import { ItemComponent} from './item/item.component';
import { DialogitemComponent } from '../home/dialogitem/dialogitem.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public authService: AuthService) { }
	procductList = [];
  popupFlag
  ngOnInit() {

  this.authService.getAllProduct().subscribe(data =>{
 this.procductList = data.carts;
 console.log( this.procductList,"procductList")
  	})
  }
addtoCart(item){

	
}
openTab() {
  this.popupFlag = true
}



}
