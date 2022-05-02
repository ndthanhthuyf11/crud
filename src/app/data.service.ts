import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http'
import { catchError, Observable, retry, throwError } from 'rxjs';
import { IProduct } from './interfaces/iproduct';
import { NgForm } from '@angular/forms';
import { Product } from './models/product';

const baseUrl = 'http://localhost:3000'

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // url: string = "http://localhost:3000/products"

  constructor(private _http: HttpClient) { }

  getProducts(): Observable<IProduct[]> {
    return this._http.get<IProduct[]>(`${baseUrl}/products`).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }
  handleError(error: HttpErrorResponse){
    return throwError(() => {new Error(error.message)});
  }
  
  postProduct(data: Product){
    return this._http.post(`${baseUrl}/product`,data);
  }
  deleteProduct(id: any){
    //xem api trong router
    return this._http.delete(`${baseUrl}/${id}`);
  }
  updateProduct(id: any, data:any){
    return this._http.patch(`${baseUrl}/${id}`,data);
  }
}
