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

// const users = JSON.parse(localStorage.getItem('users') || '[]');

// const user = users.find((u:any)=>
// u.email === this.email && u.password === this.password
// );

// if(user){
//     localStorage.setItem('user', JSON.stringify(user));
//   localStorage.setItem('loggedIn','true');
//   localStorage.setItem('user', JSON.stringify(user));

//   alert("Login successful");

//   this.router.navigate(['/']);

// }

// }
login(){
  const users = JSON.parse(localStorage.getItem('users') || '[]');

  const user = users.find((u:any) =>
    u.email === this.email && u.password === this.password
  );

  if(user){
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('loggedIn', 'true');

    alert("Login successful");
    this.router.navigate(['/']);
  } else {
    alert("Invalid email or password");
  }
}
}