
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CartService {

  cartItems: any[] = [];

  constructor() {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      this.cartItems = JSON.parse(savedCart);
    }
  }

  addToCart(product: any) {
    this.cartItems.push(product);
    localStorage.setItem("cart", JSON.stringify(this.cartItems));
  }

  getCartItems() {
    return this.cartItems;
  }

  remove(index: number) {
    this.cartItems.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(this.cartItems));
  }

  getTotal() {
    let total = 0;

    this.cartItems.forEach(p => {
      total += p.price;
    });

    return total;
  }

  clearCart() {
    this.cartItems = [];
    localStorage.removeItem("cart");
  }

}
// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })

// export class CartService {

// getCart(){

// let user = JSON.parse(localStorage.getItem('user') || 'null');

// if(!user) return [];

// let cartKey = "cart_" + user.email;

// return JSON.parse(localStorage.getItem(cartKey) || '[]');

// }


// addToCart(product:any){

// let user = JSON.parse(localStorage.getItem('user') || 'null');

// if(!user) return;

// let cartKey = "cart_" + user.email;

// let cart = JSON.parse(localStorage.getItem(cartKey) || '[]');

// let existing = cart.find((item:any)=> item.id === product.id);

// if(existing){
// existing.quantity += 1;
// }else{
// product.quantity = 1;
// cart.push(product);
// }

// localStorage.setItem(cartKey, JSON.stringify(cart));

// }


// clearCart(){

// let user = JSON.parse(localStorage.getItem('user') || 'null');

// if(!user) return;

// let cartKey = "cart_" + user.email;

// localStorage.removeItem(cartKey);

// }


// getCartCount(){

// let cart = this.getCart();

// return cart.length;

// }

// }