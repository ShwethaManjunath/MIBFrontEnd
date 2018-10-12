import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule ,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { SessionService } from "src/app/session.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private loginUrl = 'http://localhost:3000/login';
  private registerUrl = 'http://localhost:3000/register';
  private getPlayersUrl  = 'http://localhost:3000/players';
  private getPlayerByIdUrl = 'http://localhost:3000/players/';
  private googleUrl = 'http://127.0.0.1:3000/google/login';
  private getAllVideosUrl = 'http://127.0.0.1:3000/videos';
  private getVideoByIdUrl = 'http://127.0.0.1:3000/videos/videoById/';
  private likeurl ='http://127.0.0.1:3000/videos/like';
  private dislikeurl ='http://127.0.0.1:3000/videos/dislike';
  private getVideoLikeByuserIdUrl = 'http://127.0.0.1:3000/videos/getvideoLikeByname'
  private savecommentUrl = 'http://127.0.0.1:3000/videos/savevideocomment'
  private commentListByVidUrl ='http://127.0.0.1:3000/videos/comment';
  private allProductsUrl ='http://127.0.0.1:3000/admin/products';
  private getProductByIdUrl ='http://127.0.0.1:3000/admin/product/';
  private allCategoriesUrl ='http://127.0.0.1:3000/admin/categories';
  private filterUrl ='http://127.0.0.1:3000/admin/filter';
  private addtoCartUrl ='http://127.0.0.1:3000/shop/addToCart';
  private cartDetailsUrl ='http://127.0.0.1:3000/shop/cartDetailsByuser'; 
  private deleteProductUrl ='http://127.0.0.1:3000/shop/delete';
  private userProfileUrl ='http://127.0.0.1:3000/user/userProfile/';
  private updateUrl ='http://127.0.0.1:3000/user/updateProfile';
  private addProductUrl ='http://127.0.0.1:3000/admin/saveProduct';
  private getVideosUrl ='http://127.0.0.1:3000/videos';
  
  
  

  constructor(private http: HttpClient, private router: Router,
    private sessionService: SessionService) {
  }
  logIn(username,  password):  Observable<any[]> {
    return this.http.post<any[]>(this.loginUrl, {username, password}).map((data) => data);
    }
  register(name, email_id, phone, password) {
    return this.http.post<any[]>(this.registerUrl, {name , password, email_id , phone}).map((data) => data);
  }
  getPlayers():  Observable<any[]> {
    return this.http.get<any[]>(this.getPlayersUrl).map((data) => data);
    }

  getPlayerById(id): Observable<any[]> {
    console.log(id);
    return this.http.get<any[]>(this.getPlayerByIdUrl + id).map((data) => data);
  }

  googleLogin(): Observable<any[]> {
    return this.http.get<any[]>(this.googleUrl).map((data) => data);
  }

  getVideos():  Observable<any[]> {
    return this.http.get<any[]>(this.getAllVideosUrl).map((data) => data);
    }

    getVideoById(id): Observable<any[]> {
      console.log(id);
      return this.http.get<any[]>(this.getVideoByIdUrl + id).map((data) => data);
    }

    doLike(vid,uid,like,islike): Observable<any[]> {
      
      let headers = new HttpHeaders().set('Authorization', this.sessionService.getValueFromSession('token'));
      return this.http.post<any[]>(this.likeurl, {vid, uid,like,islike}, 
        {headers: headers}).map((data) => data);
    }

    doUnLike(vid,uid,disLike,islike): Observable<any[]> {
      let headers = new HttpHeaders().set('Authorization', this.sessionService.getValueFromSession('token'));
      return this.http.post<any[]>(this.dislikeurl, {vid, uid,disLike,islike}, 
        {headers: headers}).map((data) => data);
    }

    getVideoLikeByuserId(uid,vid):  Observable<any[]> {
     // console.log("user id" +uid);
    return this.http.post<any[]>(this.getVideoLikeByuserIdUrl ,{uid,vid}).map((data) => data);
      
    }

    saveComment(vid,uid,comment) : Observable<any[]>{
      //let video = {'videoId':vid,}
      let headers = new HttpHeaders().set('Authorization', this.sessionService.getValueFromSession('token'));
      //console.log("comment" +comment);
      return this.http.post<any[]>(this.savecommentUrl,{vid,uid,comment},{headers: headers}).map((data) =>data);
    }

    getcommentByVid(vid): Observable<any[]>{
      return this.http.post<any[]>(this.commentListByVidUrl,vid).map((data) =>data);
    }

    getProducts() : Observable<any[]>{
      //console.log("products");
      
      return this.http.get<any[]>(this.allProductsUrl).map((data) =>data);
      
    }

    getProductById(id): Observable<any[]> {
     // console.log(id);
      return this.http.get<any[]>(this.getProductByIdUrl + id).map((data) => data);
    }

    getAllCategories(): Observable<any[]>{
      console.log("categories");
      return this.http.get<any[]>(this.allCategoriesUrl).map((data) =>data);
    }

    getFilteredProducts(category_id) {
      return this.http.post<any[]>(this.filterUrl, {category_id}).map((data) => data);
    }

    addToCart(uid,pid,quantity){
      let headers = new HttpHeaders().set('Authorization', this.sessionService.getValueFromSession('token'));
      return this.http.post<any[]>(this.addtoCartUrl,{uid,pid,quantity},{headers:headers}).map((data)=>data);
    }

    getCartDetailsByUserId(uid){
      let headers = new HttpHeaders().set('Authorization', this.sessionService.getValueFromSession('token'));
      return this.http.post<any[]>(this.cartDetailsUrl ,{uid},{headers:headers}).map((data) =>data)
    }

    deleteProduct(pid){
      let headers = new HttpHeaders().set('Authorization', this.sessionService.getValueFromSession('token'));
      return this.http.post<any[]>(this.deleteProductUrl,(pid),{headers:headers}).map((data)=>data)
    }

    getUserProfileById(uid){  
      return this.http.post<any[]>(this.userProfileUrl,{uid}).map((data)=>data)
    }
    updateProfile(uid,name,phone,address){
      let headers = new HttpHeaders().set('Authorization', this.sessionService.getValueFromSession('token'));
      return this.http.post<any[]>(this.updateUrl,{uid,name,phone,address}).map((data)=>data);
    }

    addProduct(uid,name,quantity,price,category_id,image,desc){
      let headers = new HttpHeaders().set('Authorization', this.sessionService.getValueFromSession('token'));   
      return this.http.post<any[]>(this.addProductUrl,{uid,name,quantity,price,category_id,image,desc},{headers:headers}).map((data)=>data);
    }

    getAllVideos(){
      return this.http.get<any[]>(this.getVideosUrl).map((data)=>data)
    }
}

