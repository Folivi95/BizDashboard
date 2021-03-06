import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomerOrder } from '../shared/customer-order';

@Injectable({
  providedIn: 'root'
})
export class SalesDataService {

  constructor(private http: HttpClient) { }

  getOrders(pageIndex: number, pageSize: number) {
    return this.http.get('https://localhost:44347/api/order/' + pageIndex + '/' + pageSize);
  }

  getOrdersByCustomer(n: number): Observable<CustomerOrder[]> {
    return this.http.get<CustomerOrder[]>('https://localhost:44347/api/order/bycustomer/' + n);
  }

  getOrdersByState() {
    return this.http.get('https://localhost:44347/api/order/bystate/');
  }
}
