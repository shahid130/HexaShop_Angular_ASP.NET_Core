import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Iproduct } from '../Interfaces/Iproduct';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  apiUrl = 'https://localhost:7127';
  http = inject(HttpClient);

  constructor() { }


  getProducts(pageNumber: number, productsInOnePage: number, minPrice: number, maxPrice: number, type: string): Observable<{ products: Iproduct[], totalProducts: number } > {
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('productsInOnePage', productsInOnePage.toString())
      .set('minPrice', minPrice.toString())
      .set('maxPrice', maxPrice.toString())
      .set('type', type.toString())

    return this.http.get<{products: Iproduct[], totalProducts: number }>(this.apiUrl + '/api/Home/products', { params })
      .pipe(catchError((error: any) => {
        throw error;
      }));
  }

  getTypesOfProducts(productsInOnePage: number, type: string): Observable<Iproduct[]> {
    let params = new HttpParams()
      .set('productsInOnePage', productsInOnePage.toString())
      .set('type', type.toString())

    return this.http.get<Iproduct[]>(this.apiUrl + '/api/Home/typeofproducts', { params })
      .pipe(catchError((error: any) => {
        throw error;
      }));
  }

  /*
  getNumberOfProducts() {
    return this.http.get<any>(this.apiUrl + '/api/Home/numberofproducts')
  }*/
}
