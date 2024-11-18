import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WishlistService } from '../wishlist.service';
import { Products } from '../products';
import { AuthServiceService } from '../auth-service.service';
import { WishlistItem } from '../wishlist-item';
import { ProductsService } from '../products-service.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  wishlistItems: WishlistItem[] = [];

  constructor(
    private route: ActivatedRoute,
    private wishlistService: WishlistService,
    private authService: AuthServiceService,
    private productService: ProductsService
  ) {}

  ngOnInit(): void {
    const userId = this.authService.userId;
    if (userId) {
      this.loadWishlist(userId);
    }
  }

  loadWishlist(userId: string): void {
    this.wishlistService.getUserWishlist(userId).subscribe(wishlistItems => {
      this.wishlistItems = wishlistItems;
    });
  }
  
  addItemToWishlist(userId: string, productId: string): void {
    this.wishlistService.addItemToWishlist(userId, productId).subscribe(
      response => {
        console.log('Product added successfully', response);
        this.loadWishlist(userId); // Refresh the wishlist
      },
      error => {
        console.error('Error adding product', error);
      }
    );
  }
}
