import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup ,NgForm,FormControl, Validators} from '@angular/forms'
import { AuthService} from '../service/auth.service';
import { Router }  from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { FormBuilder, FormGroup, Validators,FormControl ,FormsModule,NgForm } from '@angular/forms';  
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
form : FormGroup;
messageClass;
message;
processing;
previousUrl;
   constructor(private router:Router,
  	private formBuilder : FormBuilder ,private authService : AuthService  
  ) {
  	this.createForm()
  }

  ngOnInit() {
  }

createForm(){
	this.form = this.formBuilder.group({
	email : new FormControl(null , Validators.required),
	password: new FormControl(null ,Validators.required)

	})
}

onLoginSubmit(){
          const user={
              email : this.form.get('email').value ,
             password : this.form.get('password').value 
        }

       // var auth = this.authService.login(user)
       // console.log(auth,"ghmjghjm")
        this.authService.login(user).subscribe(data=>{
        	console.log(data,"as")
        	if(!data.success){
        		this.messageClass = 'alert alert-danger';
                this.message = data.message;
                // this.processing= false;
                // this.enabledForm();
        	}
        	else{
        		this.messageClass = 'alert alert-success';
                this.message = data.message;
                // this.processing= true;
                                setTimeout(()=>{
                   this.router.navigate(['/home']);
                        
            },500)
          this.authService.storeUserData(data.token,data.user);
        	}

        })
        
}
}
