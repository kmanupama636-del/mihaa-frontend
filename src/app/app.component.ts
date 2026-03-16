import { Component ,DoCheck} from '@angular/core';
import { AuthService } from './services/auth.service';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
 
})
export class AppComponent implements
OnInit{
  cartCount:number=0;
  currentUser:any;
showAccountMenu = false;
isLoggedIn=false;
menuOpen=false;
constructor(public auth: AuthService) {}

ngOnInit(){

this.currentUser = JSON.parse(localStorage.getItem('user') || 'null');

this.loadCartCount();

}
toggleMenu(){
  this.menuOpen=!this.menuOpen;
}
// loadCartCount(){

// let user = JSON.parse(localStorage.getItem('user') || 'null');

// if(user){

// let cartKey = "cart_" + user.email;

// let cart = JSON.parse(localStorage.getItem(cartKey) || '[]');

// this.cartCount = cart.length;

// }else{

// this.cartCount = 0;

// }

// }
loadCartCount(){

let user = JSON.parse(localStorage.getItem('user') || 'null');

if(user){

let cartKey = "cart_" + user.email;

let cart = JSON.parse(localStorage.getItem(cartKey) || '[]');

this.cartCount = cart.reduce((total:any, item:any) => total + item.quantity, 0);

}else{

this.cartCount = 0;

}

}

toggleAccountMenu(){
this.showAccountMenu = !this.showAccountMenu;
}

// logout(){




// this.auth.logout();
// alert("Logged Out Successfully");

// this.currentUser=null;

// window.location.href = "/";
// }

logout(){
  localStorage.removeItem('loggedIn');
  localStorage.removeItem('user');
  window.location.href = "/";
}
}