import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../products-service.service';
import { WishlistService } from '../wishlist.service';
import { AuthServiceService } from '../auth-service.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  products: any[] = [];
  category: string = "";
  paginatedProducts: any[] = [];
  totalProducts = 0;
  pageSize = 8;
  currentPage = 0;
  subcategory!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductsService,
    private wishlistService: WishlistService,
    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.category = params['category'];
      this.subcategory = params['subcategory'];

      this.productService.getProductsByCategory(this.category).subscribe(data => {
        this.products = data;
        this.totalProducts = this.products.length;
        this.updatePaginatedProducts();
      });
    });
  }

  updatePaginatedProducts() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedProducts = this.products.slice(startIndex, endIndex);
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedProducts();
  }

  addToWishlist(product: any): void {
    if (!this.authService.isLoggedIn) {
      localStorage.setItem('redirectAfterLogin', this.router.url);

      let productsToAdd = JSON.parse(localStorage.getItem('productsToAdd') || '[]');
      // Check if the product is already in the list to avoid duplicates
      const productExists = productsToAdd.some((p: any) => p.id === product.id);
      if (!productExists) {
        productsToAdd.push(product);
        localStorage.setItem('productsToAdd', JSON.stringify(productsToAdd));
      }

      this.router.navigate(['/signin']);
      return;
    }
    this.addProductToWishlist(product);
  }

  addProductToWishlist(product: any): void {
    this.wishlistService.addItemToWishlist(this.authService.userId!, product.id).subscribe({
      next: () => {
        console.log('Product details:', product);
        this.router.navigate(['/wishlist', product.id]);
      },
      error: err => {
        console.error('Failed to add to wishlist:', err);
      }
    });
  }

  navigateToComparison(product: any) {
    if (product && product.id) {
      this.router.navigate(['/comparaison', product.id], { state: { product } });
    } else {
      console.error("Invalid product.");
    }
  }
}
