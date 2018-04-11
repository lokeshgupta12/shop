import { Component } from '@angular/core';
import { AuthService} from './service/auth.service';
import { Router }  from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

constructor( public authService :AuthService,  public  router :Router) { }

onClickLogout(){
	this.authService.logout();
	// this.notificationShow.show('You are logged out!',{cssClass :'alert-info'});
	this.router.navigate(['/login']);

}
}
