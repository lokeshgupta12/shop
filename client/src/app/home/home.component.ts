import { Component, OnInit } from '@angular/core';
import { AuthService} from '../service/auth.service';
import { Router }  from '@angular/router';
import {MatDialogModule} from '@angular/material';
import {MatDialog} from '@angular/material';
import { CartService} from '../service/cart.service';
// import { ItemComponent} from './item/item.component';
import { DialogitemComponent } from '../dialogitem/dialogitem.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
dialogResult="";
cartItems= [];
  constructor(public authService: AuthService, public dialog:MatDialog, private cartService:CartService) {

      this.cartItems = this.cartService.data;
         console.log(this.cartItems);
        this.cartService.getCartItem().subscribe(e=>{
          this.cartItems=e;
          console.log(e);
        });


   }
	




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

openDialog(item) {
    let diaRef = this.dialog.open(DialogitemComponent, {
      width: '800px',
      data: item
    });
    diaRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);
      this.dialogResult = result;
    });
  }

}
