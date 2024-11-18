import { Component, OnInit } from "@angular/core";
import { ProductsService } from "../products-service.service";
import { Router } from "@angular/router";

@Component({
    selector:'app-aceuil',
    templateUrl:'./acueil.component.html',
    styleUrls:['./acueil.component.css']

})
export class AcueilComponent implements OnInit {
  themes = ['Telephonie', 'Informatique', 'Electromenager','gaming','Tv','Maison','Impression','Sécurité','Bureautique','Beauté et Santé','Bébé','Jeux et Jouets'];
  themeImages = ['samsung.png', 'informatique.jpg', 'machine.png', 'tv.png','tele.png','meuble.png','imprimante.jpg','securite.png','bureautique.png','beaute.png','bebe.png','jouet.png'];
  categories: { [key: string]: string[] } = {
    'Telephonie': ['Smartphone mobile tunisie', 'Smartwatch', 'Accessoires telephonie'],
    'Informatique': ['Ordinateurs portables', 'Tablettes tactiles', 'Ordinateur de bureau','Composants informatique','Périphériques accessoires','Serveurs','Stockage'],
    'Electromenager': ['Gros electromenager', 'Preparation culinaire','Cafe et petit dejeuner','Cuisine'],
    'gaming':['Peripheriques et accessoires gamers','Console de jeux','Composant pc gamer','Accessoires de jeux'],
    'Tv':['Téléviseurs','Photos caméscopes','Home cinéma','Récepteurs numériques abonnement','Son numérique'],
    'Maison':['Bricolage jardin','Maison','Mobilier de jardin','Décoration','Animalerie'],
    'Impression':['Imprimantes','Photocopieurs','Scanners'],
    'Sécurité':['Vidéosurveillance','Matériel de sécurité biométrie','Logiciels'],
    'Bureautique':['Fourniture de bureau','Scolaire','Tableaux'],
    'Beauté et Santé':['Parfums','Hygiène soin beauté','Santé'],
    'Bébé':['Toilette soin de bébé','Bébé se promène','Bébé mange'],
    'Jeux et Jouets':['Jeux éducatifs et de société','Poupées poupons']
  };

  constructor(private productService: ProductsService, private router: Router) { }

  ngOnInit(): void {
  }

  onThemeClick(theme: string): void {
    // Utilisez le service pour récupérer les produits par thème depuis l'API
    // Puis redirigez vers la page de catégories avec les produits récupérés
    (['/categories', theme]);
  }
}