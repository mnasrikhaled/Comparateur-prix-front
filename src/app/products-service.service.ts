import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs";
import { Products } from "./products";



@Injectable({
    providedIn: 'root'
  })
  export class ProductsService {
    private API_URL = 'http://localhost:8080/products';
    
  
    constructor(private http: HttpClient) { }
  
    getProductsByTheme(theme: string): Observable<any> {
      return this.http.get<any>(`${this.API_URL}/theme/${theme}`);
    }
   
   getProductsByCategory(category:String): Observable<any> {
    return this.http.get<any[]>(`${this.API_URL}/category/${category}`);
   }
   getProductWithPricesById(productId: string): Observable<Products[]>{
   return this.http.get<Products[]>(`${this.API_URL}/product-with-prices/`+productId)
   }
   getProductById(id:String):Observable<Products[]>{
    return this.http.get<Products[]>(`${this.API_URL}/id/`+id)
  }
}