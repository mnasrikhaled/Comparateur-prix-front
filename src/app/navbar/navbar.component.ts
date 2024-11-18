import { Component, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import { HttpClient } from '@angular/common/http';
import { WishlistItem } from '../wishlist-item';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  showSearchBar: boolean = false;
  username: string = '';
  searchText: string = '';
  suggestions: any[] = [];
  themes: any;
  wishlistItems: WishlistItem[] = [];
  product:any
  

  constructor(
    private router: Router, 
    public authService: AuthServiceService,
    private changeDetectorRef: ChangeDetectorRef,
    private http: HttpClient
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.showSearchBar = event.url !== '/accueil';
      }
    });
  }
  search(term: string): void {
    if (term ) {
      this.http.get<any[]>(`http://localhost:8080/ela/search?prefix=${term}`)
        .subscribe(
          (data: any[]) => {
            this.suggestions = data;
          },
          (error) => {
            console.error("Error fetching suggestions:", error);
          }
        );
    }
  }
  

  ngOnInit(): void {
    this.username = localStorage.getItem('username') || ''; // Récupérer le nom d'utilisateur depuis le stockage local
    console.log('isLoggedIn:', this.authService.isLoggedIn);
    console.log('username:', this.username);
  }

  submitLoginForm() {
    console.log('Formulaire de connexion soumis !');
  }

  submitSignupForm() {
    console.log('Formulaire d\'inscription soumis !');
  }

  signIn(username: string,userId: string) {
    this.authService.login(username,userId);
    this.username = username;
    localStorage.setItem('username', username);
  }

  logout() {
    this.authService.logout();
    this.username = ''; // Réinitialiser username à une chaîne vide lorsque l'utilisateur se déconnecte
    localStorage.removeItem('username'); // Supprimer le nom d'utilisateur du stockage local
    this.changeDetectorRef.detectChanges(); // Déclencher la détection des changements
  }

  categories: string[] = [
    'Telephonie',
    'Informatique',
    'Electromenager',
    'Gaming',
    'Tv',
    'Maison',
    'Impression',
    'Sécurité',
    'Bureautique',
    'Beauté et Santé',
    'Bébé',
    'Jeux et Jouets'
  ];
  subcategories: { [key: string]: string[] } = {
    'Telephonie': ['Smartphone mobile tunisie', 'Smartwatch', 'Accessoires telephonie'],
    'Informatique': ['Ordinateurs portables', 'Tablettes tactiles', 'Ordinateur de bureau','Composants informatique','Périphériques accessoires','Serveurs','Stockage'],
    'Electromenager': ['Gros electromenager', 'Preparation culinaire','Cafe et petit dejeuner','Cuisine'],
    'Gaming': ['Peripheriques et accessoires gamers','Console de jeux','Composant pc gamer','Accessoires de jeux'],
    'Tv': ['Téléviseurs','Photos caméscopes','Home cinéma','Récepteurs numériques abonnement','Son numérique'],
    'Maison': ['Bricolage jardin','Maison','Mobilier de jardin','Décoration','Animalerie'],
    'Impression': ['Imprimantes','Photocopieurs','Scanners'],
    'Sécurité': ['Vidéosurveillance','Matériel de sécurité biométrie','Logiciels'],
    'Bureautique': ['Fourniture de bureau','Scolaire','Tableaux'],
    'Beauté et Santé': ['Parfums','Hygiène soin beauté','Santé'],
    'Bébé': ['Toilette soin de bébé','Bébé se promène','Bébé mange'],
    'Jeux et Jouets': ['Jeux éducatifs et de société','Poupées poupons']
  };
    selectCategory(category: string) {
    console.log('Catégorie sélectionnée :', category);
    // Vous pouvez ajouter ici le code pour effectuer des actions en fonction de la catégorie sélectionnée
  }
  
  

  
  onThemeClick(theme: string): void {
    // Utilisez le service pour récupérer les produits par thème depuis l'API
    // Puis redirigez vers la page de catégories avec les produits récupérés
    (['/categories', theme]);
  }
  navigateToWishlist(product: any): void {
    if (this.authService.isLoggedIn,product.id) {
      this.router.navigate(['/wishlist', product.id]);
    } else {
      this.router.navigate(['/signin']);
    }
  }
}

  