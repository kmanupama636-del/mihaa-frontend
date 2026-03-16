import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
selector:'app-login',
templateUrl:'./login.component.html',
styleUrls: ['./login.component.css']
})

export class LoginComponent{

email=''
password=''

constructor(private auth:AuthService, private router:Router){}

// login(){

// const data={
// email:this.email,
// password:this.password
// }

// this.auth.login(data).subscribe((res:any)=>{

// this.auth.saveUser(res)

// this.router.navigate(['/'])

// })
login(){

const users = JSON.parse(localStorage.getItem('users') || '[]');

const user = users.find((u:any)=>
u.email === this.email && u.password === this.password
);

// if(user){

// localStorage.setItem('loggedIn','true');
// localStorage.setItem('user',JSON.stringify(user));

// alert("Login successful");

// this.router.navigate(['/']); // IMPORTANT

// }else{

// alert("Invalid email or password");

// }

// }
if(user){

localStorage.setItem('currentUser', JSON.stringify(user));

alert("Login successful");

this.router.navigate(['/']);

}else{

alert("Invalid email or password");

}
}


}