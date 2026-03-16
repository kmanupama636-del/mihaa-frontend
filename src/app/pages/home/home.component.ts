import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
selector: 'app-home',
templateUrl: './home.component.html',
styleUrls: ['./home.component.css']
})

export class HomeComponent {

categories:any[]=[];

constructor(private http:HttpClient, private router:Router){}

ngOnInit(){

this.http.get("http://mihaa-backend.onrender.com/api/categories/")
.subscribe((data:any)=>{

this.categories = data;

});

}

openCategory(categoryId:number){

this.router.navigate(['/products'],{
queryParams:{category:categoryId}
});

}
goToCategory(category:string){
this.router.navigate(['/products'],{queryParams:{category:category}});
}
}

