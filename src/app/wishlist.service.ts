import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WishlistItem } from './wishlist-item';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  private API_URL = 'http://localhost:8080/wishlist';

  constructor(private http: HttpClient) { }
  getUserWishlist(id: string): Observable<WishlistItem[]> {
    return this.http.get<WishlistItem[]>(`${this.API_URL}/${id}`);
  }

  // Méthode pour ajouter un élément à la liste de souhaits
  addItemToWishlist(userId: string, productId: string): Observable<any> {
    return this.http.post(`${this.API_URL}/${userId}/add/${productId}`, {});
  }

}
