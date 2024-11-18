import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private _isLoggedIn = false;
  private _userId: string | null = null;
  private _username: string = '';
  


  constructor(private router: Router) {}

  get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  get userId(): string | null {
    return this._userId;
  }

  login(username: string, userId: string) {
    this._username = username;
    this._userId = userId;
    this._isLoggedIn = true;
    console.log('Utilisateur connecté avec succès:', username);
    this.router.navigate(['/']); // Redirigez l'utilisateur après la connexion, modifiez selon le besoin
    console.log('aaa',this.userId)
  }

  logout() {
    this._username = '';
    this._userId = null;
    this._isLoggedIn = false;
    localStorage.removeItem('username');
    this.router.navigate(['/signin']);
  }


  updateLoggedInStatus(status: boolean) {
    this._isLoggedIn = status;
  }
}
