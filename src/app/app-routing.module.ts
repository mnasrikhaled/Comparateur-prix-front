import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcueilComponent } from './acueil/aceuil.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { NavbarComponent } from './navbar/navbar.component';

import { CategoryComponent } from './category/category.component';
import { AdminComponent } from './admin/admin.component';
import { ComparaisonComponent } from './comparaison/comparaison.component';
import { AlertComponent } from './alert/alert.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { FormsComponent } from './forms/forms.component';


const routes: Routes = [
  { path: '', component: AcueilComponent },
  { path: 'accueil', component: AcueilComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: '', component: CategoryComponent },
  { path: 'categories/:category', component: CategoryComponent },
  
  { path: 'admin', component: AdminComponent },
  { path: 'comparaison/:id', component: ComparaisonComponent },
  { path: 'alert/:id', component: AlertComponent },
  { path: 'wishlist/:id', component: WishlistComponent },
  { path: 'forms', component: FormsComponent },

  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [AcueilComponent,SignupComponent,SigninComponent,NavbarComponent,CategoryComponent,AdminComponent,ComparaisonComponent,AlertComponent,WishlistComponent,FormsComponent]
