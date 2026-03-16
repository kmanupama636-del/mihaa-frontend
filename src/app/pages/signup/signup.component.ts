// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { AuthService } from '../../services/auth.service';

// @Component({
//   selector: 'app-signup',
//   templateUrl: './signup.component.html',
//   styleUrls: ['./signup.component.css']
// })

// export class SignupComponent {

//   form:any = {}

//   constructor(
//     private auth:AuthService,
//     private router:Router
//   ){}

//   signup(){

//     this.auth.signup(this.form).subscribe((res:any)=>{

//       alert("Account created successfully")

//       this.router.navigate(['/login'])

//     })

//   }

// }
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
selector:'app-signup',
templateUrl:'./signup.component.html',
styleUrls: ['./signup.component.css']
})

export class SignupComponent{

name=''
email=''
password=''

constructor(private auth:AuthService, private router:Router){}



// const user={
// name:this.name,
// email:this.email,
// password:this.password
// }

// this.auth.signup(data).subscribe(()=>{

// alert("Account created")

// this.router.navigate(['/login'])

// })
// localStorage.setItem('user',JSON.stringify(user));
// alert("Account created Successfully")

// this.router.navigate(['/login'])
// }
signup(){

const users = JSON.parse(localStorage.getItem('users') || '[]');

const existingUser = users.find((u:any)=>u.email === this.email);

if(existingUser){
alert("Email already registered");
return;
}

const newUser = {
name:this.name,
email:this.email,
password:this.password
};

users.push(newUser);

localStorage.setItem('users', JSON.stringify(users));

alert("Account created successfully");

this.router.navigate(['/login']);

}

}