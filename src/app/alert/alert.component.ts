import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products-service.service';
import { UserAlertService } from '../user-alert.service';
import { Products } from '../products';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  budget: number = 0;
  products: Products[] = [];
  idUser: any;
  id: any;
  alertMessage: string = '';
  alertType: string = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private userAlertService: UserAlertService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProductWithPricesById(id)
        .subscribe(product => {
          this.products = product;
        });
    }
  }

  submitAlert(): void {
    if (this.products.length > 0) {
      const product = this.products[0];
      this.idUser = localStorage.getItem("idUser");
      this.id = this.route.snapshot.paramMap.get('id');
      this.sendBudget(this.idUser, this.id, this.budget);
    } else {
      this.setAlert('Invalid data for activating alert.', 'error');
    }
  }

  sendBudget(id: string, _id: string, budget: number): void {
    this.userAlertService.sendBudget(id, _id, budget)
      .subscribe(
        response => {
          this.setAlert('Budget sent successfully', 'success');
        },
        error => {
          this.setAlert('Error sending budget', 'error');
        }
      );
  }

  setAlert(message: string, type: string): void {
    this.alertMessage = message;
    this.alertType = type;
    setTimeout(() => {
      this.alertMessage = '';
    }, 3000);
  }
}
