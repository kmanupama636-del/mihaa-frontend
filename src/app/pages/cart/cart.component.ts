// import { Component } from '@angular/core';
// import { CartService } from '../../services/cart.service';

// @Component({
// selector:'app-cart',
// templateUrl:'./cart.component.html',
// styleUrls:['./cart.component.css']
// })
// export class CartComponent {

// cartItems:any[]

// constructor(private cartService:CartService){
// this.cartItems = cartService.getCartItems()
// }

// remove(i:number){
// this.cartService.remove(i)
// }

// getTotal(){
// return this.cartService.getTotal()
// }

// }
 import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
//  import { AuthService } from 'src/app/services/auth.service';
 import { Router } from '@angular/router';
 

@Component({
selector:'app-cart',
templateUrl:'./cart.component.html',
styleUrls:['./cart.component.css']
})
export class CartComponent{

cart:any[]=[];
total:number=0;
constructor( private router:Router,private http:HttpClient){}
  ngOnInit(){
 this.loadCart();
  }

//   loadCart(){

// this.cart = JSON.parse(localStorage.getItem('cart') || '[]');

// this.cart.forEach((item:any)=>{
// if(!item.quantity){
// item.quantity = 1;
// }
// });

// this.calculateTotal();

// }
calculateTotal(){

this.total = 0;

this.cart.forEach((item:any)=>{

this.total += Number(item.price) * Number(item.quantity);

});

}
// removeItem(id:number){

// this.cart = this.cart.filter((item:any)=> item.id !== id);

// localStorage.setItem('cart', JSON.stringify(this.cart));

// this.calculateTotal();

// }

// checkout(){

// let user = JSON.parse(localStorage.getItem('user') || 'null');

// if(!user){
// alert("Please login first");
// return;
// }
// let cartKey="cart_"+user.email;
// let cart = JSON.parse(localStorage.getItem(cartKey) || '[]');

// let ordersKey = "orders_" + user.email;

// let orders = JSON.parse(localStorage.getItem(ordersKey) || '[]');

// cart.forEach((item:any)=>{

// orders.push({
// name:item.name,
// price:item.price,
// image:item.image,
// quantity:item.quantity || 1,
// status:"Pending"
// });

//   name:item.name,
//   price:item.price,
//   image:item.image,
//   quantity:item.quantity || 1
//  }).subscribe(res=>{
//   console.log("Order saved in Django");
//  });
// });

// localStorage.setItem(ordersKey, JSON.stringify(orders));

// localStorage.removeItem(cartKey);

// this.cart = [];
// // this.total = 0;

// alert("Order placed successfully");

// this.router.navigate(['/orders']);

// }
checkout(){

let user = JSON.parse(localStorage.getItem('user') || 'null');

if(!user){
  alert("Please login first");
  this.router.navigate(['/login']);
  return;
}

let cartKey = "cart_" + user.email;
let cart = JSON.parse(localStorage.getItem(cartKey) || '[]');

cart.forEach((item:any)=>{


let order={
name:item.name,
price:item.price,
image:item.image,
quantity:item.quantity || 1,
status:"Pending",
email:user.email

};
this.http.post("https://mihaa-backend.onrender.com/api/orders/create/", order)
.subscribe({
next:(res)=>{
console.log("Order placed",res);
localStorage.removeItem(cartKey);

alert("Order placed successfully");

this.router.navigate(['/orders']);
},
error:(err)=>{
console.log("Error",err);
}
});

});



}
// increase(item:any){

// item.quantity = (item.quantity || 1) + 1;

// localStorage.setItem('cart',JSON.stringify(this.cart));

// this.calculateTotal();

// }

// decrease(item:any){

// if(item.quantity > 1){

// item.quantity--;

// localStorage.setItem('cart',JSON.stringify(this.cart));

// this.calculateTotal();

// }

// }
loadCart(){

let user = JSON.parse(localStorage.getItem('user') || 'null');

if(!user){
this.cart = [];
// this.total = 0;
return;
}

let cartKey = "cart_" + user.email;

this.cart = JSON.parse(localStorage.getItem(cartKey) || '[]');

this.cart.forEach((item:any)=>{
if(!item.quantity){
item.quantity = 1;
}
});

this.calculateTotal();

}

increase(item:any){



let user = JSON.parse(localStorage.getItem('user') || 'null');
let cartKey = "cart_" + user.email;
item.quantity++;
localStorage.setItem(cartKey, JSON.stringify(this.cart));

this.calculateTotal();

}



decrease(item:any){



let user = JSON.parse(localStorage.getItem('user') || 'null');
let cartKey = "cart_" + user.email;
if(item.quantity > 1){

item.quantity--;
localStorage.setItem(cartKey, JSON.stringify(this.cart));

this.calculateTotal();

}

}


removeItem(id:number){

this.cart = this.cart.filter((item:any)=> item.id !== id);

let user = JSON.parse(localStorage.getItem('user') || 'null');
let cartKey = "cart_" + user.email;

localStorage.setItem(cartKey, JSON.stringify(this.cart));

this.calculateTotal();

}
goToDetails(product:any){

    this.router.navigate(['/product-details', product.id]);

  }
}