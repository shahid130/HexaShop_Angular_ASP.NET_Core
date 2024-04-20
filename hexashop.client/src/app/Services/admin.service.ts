import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  apiUrl = 'https://localhost:7127';
  http= inject(HttpClient);

  constructor() { }


  createProduct(product: FormData) {
    return this.http.post<any>(this.apiUrl + '/api/Admin/addproduct', product);
  }

  /*createProduct(product: any) {
    return this.auth.post<any>(this.apiUrl + '/api/Home/addproduct', product, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    });
  }*/
}
