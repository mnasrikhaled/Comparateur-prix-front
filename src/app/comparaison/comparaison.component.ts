import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../products-service.service';
import { Products } from '../products';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-comparaison',
  templateUrl: './comparaison.component.html',
  styleUrls: ['./comparaison.component.css']
})
export class ComparaisonComponent implements OnInit {
  id!: string;
  products: Products[] = [];
  idProduct: string | undefined ;
 editMode!: false;
 budget: number | undefined;
  
  constructor(
    private route: ActivatedRoute, 
    private productService: ProductsService,
    private router: Router, 
    private authService: AuthServiceService // Ajoutez le modificateur d'accès ici
  ) { }
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.getProductWithPricesById(this.id);

  }

  getProductWithPricesById(id: string): void {
    this.productService.getProductWithPricesById(id)
      .subscribe(products => {
        this.products = products;
        console.log(this.products); 
      });
  }

  navigateToLink(link: string) {
    console.log('Navigating to link:', link);
    if (link && link.trim() !== '') {
      window.location.href = link;
    } else {
      console.error('Invalid link:', link);
    }
  }
  navigateToAlert() {
    this.route.params.subscribe(param => {
      this.idProduct = param['id'];
    });
  
    if (this.authService.isLoggedIn) { // Utilisez la propriété isLoggedIn comme une valeur booléenne
      console.log(this.products);
      this.router.navigate(['/alert', this.idProduct]);
    } else {
      this.router.navigate(['/signin'],{ queryParams: { returnUrl: `/comparaison/${this.idProduct}` } }); // Redirigez vers la page de connexion si l'utilisateur n'est pas connecté
    }
  }
  
}


