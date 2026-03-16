import { Injectable } from '@angular/core';

@Injectable({
providedIn: 'root'
})
export class WishlistService {

items:any[]=[]

add(product:any){
this.items.push(product)
}

getItems(){
return this.items
}

remove(index:number){
this.items.splice(index,1)
}

}

