// import { Component } from '@angular/core';
// import { WishlistService } from '../../services/wishlist.service';

// @Component({
// selector:'app-wishlist',
// templateUrl:'./wishlist.component.html',
// styleUrls:['./wishlist.component.css']
// })

// export class WishlistComponent{

// items:any[]

// constructor(private wishlist:WishlistService){
// this.items = wishlist.getItems()
// }

// remove(i:number){
// this.wishlist.remove(i)
// }

// }
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
selector:'app-wishlist',
templateUrl:'./wishlist.component.html',
styleUrls:['./wishlist.component.css']
})
export class WishlistComponent{

wishlist:any[]=[];
constructor( private router:Router){}
ngOnInit(){
this.loadWishlist();
// this.wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
  }



removeItem(product:any){

let user = JSON.parse(localStorage.getItem('user') || 'null');

let wishlistKey = "wishlist_" + user.email;

// let wishlist = JSON.parse(localStorage.getItem(wishlistKey) || '[]');

this.wishlist = this.wishlist.filter((item:any)=> item.id !== product.id);

localStorage.setItem(wishlistKey, JSON.stringify(this.wishlist));

// this.wishlist=wishlist;

}
// moveToCart(product:any){
// let user = JSON.parse(localStorage.getItem('user') || 'null');
// if(!user){
// alert("Please login first");
// return;
// }
// let cartKey = "cart_" + user.email;
// let wishlistKey = "wishlist_" + user.email;
// let cart = JSON.parse(localStorage.getItem(cartKey) || '[]');
// let wishlist = JSON.parse(localStorage.getItem(wishlistKey) || '[]');
// cart.push({
// id: product.id,
// name: product.name,
// price: product.price,
// image: product.image,
// quantity:1
// });
// this.wishlist = this.wishlist.filter((item:any)=> item.id !== product.id);
// localStorage.setItem(cartKey, JSON.stringify(cart));
// localStorage.setItem(wishlistKey, JSON.stringify(this.wishlist));
// this.wishlist=wishlist;
// }
// moveToCart(product:any){

// let user = JSON.parse(localStorage.getItem('user') || 'null');

// if(!user){
// alert("Please login first");
// return;
// }

// let cartKey = "cart_" + user.email;
// let wishlistKey = "wishlist_" + user.email;

// let cart = JSON.parse(localStorage.getItem(cartKey) || '[]');
// let wishlist = JSON.parse(localStorage.getItem(wishlistKey) || '[]');

// /* check if item already exists */

// let existing = cart.find((item:any)=> item.id === product.id);

// if(existing){

// existing.quantity += 1;

// }else{

// cart.push({
// id: product.id,
// name: product.name,
// price: product.price,
// image: product.image,
// quantity:1
// });

// }

// /* save cart */

// localStorage.setItem(cartKey, JSON.stringify(cart));

// /* remove from wishlist */

// this.wishlist = wishlist.filter((item:any)=> item.id !== product.id);

// localStorage.setItem(wishlistKey, JSON.stringify(this.wishlist));

// }
moveToCart(product:any){

let user = JSON.parse(localStorage.getItem('user') || 'null');

if(!user){
alert("Please login first");
return;
}

let cartKey = "cart_" + user.email;
let wishlistKey = "wishlist_" + user.email;

let cart = JSON.parse(localStorage.getItem(cartKey) || '[]');
let wishlist = JSON.parse(localStorage.getItem(wishlistKey) || '[]');

/* check existing product by NAME */
let existing = cart.find((item:any)=> item.name === product.name);

if(existing){
existing.quantity += 1;
}else{
cart.push({
id: product.id,
name: product.name,
price: product.price,
image: product.image,
quantity: 1
});
}

/* save cart */
localStorage.setItem(cartKey, JSON.stringify(cart));

/* remove item from wishlist */
this.wishlist = wishlist.filter((item:any)=> item.name !== product.name);

localStorage.setItem(wishlistKey, JSON.stringify(this.wishlist));

}
loadWishlist(){

let user = JSON.parse(localStorage.getItem('user') || 'null');

if(!user){
this.wishlist = [];
return;
}

let wishlistKey = "wishlist_" + user.email;

this.wishlist = JSON.parse(localStorage.getItem(wishlistKey) || '[]');

}
}

