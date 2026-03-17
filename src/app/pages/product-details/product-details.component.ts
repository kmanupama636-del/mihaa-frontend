import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})

export class ProductDetailsComponent implements OnInit {

  product:any
   wishlist:any[]=[];

  constructor(
    private route:ActivatedRoute,
    private productService:ProductService,private router:Router,private http:HttpClient,public auth:AuthService
  ){}

 ngOnInit(){

    const id = this.route.snapshot.params['id'];

    this.http.get<any>('https://mihaa-backend.onrender.com/api/products/')
    .subscribe(data=>{

      this.product = data.find((p:any)=> p.id == id);

    });

  }


// addToCart(product:any){

// let cart = JSON.parse(localStorage.getItem('cart') || '[]');
// product.quantity=1;
// cart.push(product);

// localStorage.setItem('cart', JSON.stringify(cart));

// alert("Added to Cart");

// }
// addToCart(product:any){

// let cart = JSON.parse(localStorage.getItem('cart') || '[]');

// let existingProduct = cart.find((item:any) => item.id === product.id);

// if(existingProduct){

// existingProduct.quantity += 1;

// }else{

// product.quantity = 1;

// cart.push(product);

// }

// localStorage.setItem('cart', JSON.stringify(cart));

// alert("Added to Cart");

// }

addToWishlist(product:any){

let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');

wishlist.push(product);

localStorage.setItem('wishlist', JSON.stringify(wishlist));

alert("Added to Wishlist");

}
buyNow(product:any){

let user = JSON.parse(localStorage.getItem('user') || 'null');

if(!user){
alert("Please login first");
this.router.navigate(['/login']);
return;
}

let cartKey = "cart_" + user.email;

let cart = JSON.parse(localStorage.getItem(cartKey) || '[]');

let existing = cart.find((item:any)=> item.name === product.name);

if(existing){
existing.quantity += 1;
}else{
cart.push({
name:product.name,
price:product.price,
image:product.image,
quantity:1
});
}

localStorage.setItem(cartKey, JSON.stringify(cart));

this.router.navigate(['/cart']);

}

goToDetails(product:any){

this.router.navigate(['/product',product.id]);

}



toggleWishlist(product:any){

let user = JSON.parse(localStorage.getItem('user') || 'null');

if(!user){

alert("Please login first");
this.router.navigate(['/login']);
return;
}

let wishlistKey = "wishlist_" + user.email;

let wishlist = JSON.parse(localStorage.getItem(wishlistKey) || '[]');

let index = wishlist.findIndex((item:any)=> item.id === product.id);

if(index > -1){
wishlist.splice(index,1);
}else{
wishlist.push(product);
}

localStorage.setItem(wishlistKey, JSON.stringify(wishlist));

}

  isWishlisted(product:any){
   let user = JSON.parse(localStorage.getItem('user') || 'null');

if(!user) return false;

let wishlistKey = "wishlist_" + user.email;

let wishlist = JSON.parse(localStorage.getItem(wishlistKey) || '[]');

return wishlist.some((item:any)=> item.id === product.id);
  }

addToCart(product:any){

let user = JSON.parse(localStorage.getItem('user') || 'null');

if(!user){
alert("Please login first");
this.router.navigate(['/login']);
return;
}

let cartKey = "cart_" + user.email;

let cart = JSON.parse(localStorage.getItem(cartKey) || '[]');

let existing = cart.find((item:any)=> item.id === product.id);

if(existing){

existing.quantity = (existing.quantity || 1) + 1;

}else{

cart.push({
id: product.id,
name: product.name,
price: product.price,
image: product.image,
quantity:1
});

}

localStorage.setItem(cartKey, JSON.stringify(cart));

alert("Added to cart");

}
//   toggleWishlist(product:any){

//     let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');

//     let index = wishlist.findIndex((item:any)=> item.id === product.id);

//     if(index === -1){
//       wishlist.push(product);
//     } else {
//       wishlist.splice(index,1);
//     }

//     localStorage.setItem('wishlist', JSON.stringify(wishlist));

//     this.wishlist = wishlist;
//   }

//   isWishlisted(id:number){
//     return this.wishlist.some((item:any)=> item.id === id);
//   }


// 
}