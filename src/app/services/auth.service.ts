import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
@Injectable({
providedIn: 'root'
})

export class AuthService {

api = "https://mihaa-backend.onrender.com/api/"

constructor(private http:HttpClient){}

login(data:any){
return this.http.post(this.api + "/login/", data)
}

signup(data:any){
return this.http.post(this.api + "/signup/", data)
}

saveUser(user:any){
localStorage.setItem("user", JSON.stringify(user))
}

getUser(){
return JSON.parse(localStorage.getItem("user") || "null")
}

isLoggedIn(){

return localStorage.getItem("user") != null
}

logout(){
localStorage.removeItem("user");
// localStorage.removeItem("loggedIn")
}

}