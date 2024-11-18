import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_URL = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }
  getRoles() {
    return ['USER', 'ADMIN'];
  }

  logout(): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/logout`, null);
  }
  signup(signupRequest: User): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/signup`, signupRequest);
  }
  signin(signinRequest:User):Observable<User> {
    return this.http.post<User>(`${this.API_URL}/signin`, signinRequest);
  }
  getAll():Observable<User[]>{
    return this.http.get<User[]>(`${this.API_URL}/all`);
  }
  getUserById(id:String):Observable<User[]>{
    return this.http.get<User[]>(`${this.API_URL}/id/`+id)
  }
  updateUser(updatedUser: User, id: string): Observable<User> {
    return this.http.put<User>(`${this.API_URL}/id/` + id, updatedUser);
  }
  deleteUser(user:User):Observable<User>{
    return this.http.delete<User>(`${this.API_URL}/id/`+user.id)
  }
}
