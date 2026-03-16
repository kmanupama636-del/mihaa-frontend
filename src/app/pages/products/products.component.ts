import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {

  products:any[] = [];
  wishlist:any[]=[];
  constructor(
    private http:HttpClient,
    private router:Router,
    private cartService:CartService,
    private route:ActivatedRoute,
    public auth:AuthService
  ) {}

  ngOnInit(){
    this.wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    this.http.get<any>('https://mihaa-backend.onrender.com/api/products/')
    .subscribe(data=>{
      this.products = data;
    });
this.route.queryParams.subscribe(params => {

const category = params['category'];

if(category){

setTimeout(() => {

const element = document.getElementById(category);

if(element){
element.scrollIntoView({behavior:'smooth'});
}

},500);

}

});

  }
 


// buyNow(product:any){

// let user = JSON.parse(localStorage.getItem('user') || 'null');

// if(!user){
// alert("Please login first");
// return;
// }

// let cartKey = "cart_" + user.email;

// let cart = JSON.parse(localStorage.getItem(cartKey) || '[]');

// cart.push({
// name:product.name,
// price:product.price,
// image:product.image,
// quantity:1
// });

// localStorage.setItem(cartKey, JSON.stringify(cart));

// this.router.navigate(['/cart']);

// }

buyNow(product:any){

let user = JSON.parse(localStorage.getItem('user') || 'null');

if(!user){
alert("Please login first");
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

    this.router.navigate(['/product-details', product.id]);

  }

  addToCart(product:any){

let user = JSON.parse(localStorage.getItem('user') || 'null');

if(!user){
alert("Please login first");
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
 toggleWishlist(product:any){

let user = JSON.parse(localStorage.getItem('user') || 'null');

if(!user){
alert("Please login first");
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

}
