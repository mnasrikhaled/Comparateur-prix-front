import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAlertService {
  private API_URL = 'http://localhost:8080/Alert';

  constructor(private http: HttpClient) { }

  sendBudget(_id: string, id: string, budget: number) {
    return this.http.get<any>(`${this.API_URL}/send-budget/`+ _id+ "/" +id + "/" + budget );
  }
}
