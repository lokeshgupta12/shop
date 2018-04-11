import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../service/auth.service';
import { Router }  from '@angular/router';
import { HomeComponent } from '../home.component'

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  constructor(public authService: AuthService ) { }
	procductList = [];
  ngOnInit() {

  this.authService.getAllProduct().subscribe(data =>{
 this.procductList = data.carts;
 // console.log( this.procductList,"sg")
  	})
  }


  //   openDialog(): void {
  //   let dialogRef = this.dialog.open(HomeComponent, {
  //     width: '250px',
  //     // data: { name: this.name, animal: this.animal }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //     // this.animal = result;
  //   });
  // }
}
