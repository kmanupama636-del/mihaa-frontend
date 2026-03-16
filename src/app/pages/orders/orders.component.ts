// import { Component } from '@angular/core';
//  import { AuthService } from 'src/app/services/auth.service';
//  import { Router } from '@angular/router';

// @Component({
// selector:'app-orders',
// templateUrl:'./orders.component.html',
// styleUrls:['./orders.component.css']
// })
// export class OrdersComponent{

// orders:any[]=[];
// constructor(private auth:AuthService, private router:Router){}
// ngOnInit(){

// let user = JSON.parse(localStorage.getItem('user') || 'null');

// if(user){

// let ordersKey = "orders_" + user.email;

// this.orders = JSON.parse(localStorage.getItem(ordersKey) || '[]');

// }else{
// this.orders = [];
// }

// }



// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-orders',
//   templateUrl: './orders.component.html',
//   styleUrls: ['./orders.component.css']
// })
// export class OrdersComponent implements OnInit {

//   orders:any[] = [];
// constructor(private http:HttpClient){}
//   ngOnInit() {
//     this.loadOrders();
//     setInterval(() => {
//        this.loadOrders(); 
//     }, 5000);}
//     loadOrders(){
//     let user=JSON.parse(localStorage.getItem('user')||'null');
//     if(!user){
//         this.orders=[];
//         return;
//     }

//   .subscribe((data:any)=>{
//     this.orders = [...data];
// //     this.orders.forEach((order:any)=>{

// // });
//   });
//     }
   
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
selector:'app-orders',
templateUrl:'./orders.component.html',
styleUrls:['./orders.component.css']
})
export class OrdersComponent implements OnInit{

orders:any[]=[];

constructor(private http:HttpClient){}

ngOnInit(){

this.loadOrders();

}

loadOrders(){

let user = JSON.parse(localStorage.getItem('user') || 'null');

if(!user){
this.orders=[];
return;
}

this.http.get<any>(`http://mihaa-backend.onrender.com/api/orders/?email=${user.email}`)
.subscribe((data:any)=>{

this.orders=[...data];

this.orders.forEach((order:any)=>{
this.autoStatusUpdate(order);
});

});

}


autoStatusUpdate(order:any){

if(order.status==="Pending"){

setTimeout(()=>{
order.status="Order Confirmed";
this.updateStatus(order);
},5000);

setTimeout(()=>{
order.status="Shipped";
this.updateStatus(order);
},10000);

setTimeout(()=>{
order.status="Out For Delivery";
this.updateStatus(order);
},15000);

setTimeout(()=>{
order.status="Delivered";
this.updateStatus(order);
},20000);

}

}


updateStatus(order:any){

this.http.put(
`http://mihaa-backend.onrender.com/api/orders/update/${order.id}/`,
{
status:order.status
}
).subscribe();

}

}



  







