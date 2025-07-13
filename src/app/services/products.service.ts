import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {Product} from "../model/product.model";
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  products :Array<Product>;


  constructor() {
       this.products = [
          { id: 1, name: "computer", price: 5000,promotion:true },
          { id: 2, name: "imprimente", price: 450,promotion:false },
          { id: 3, name: "phone", price: 3000,promotion:true },
          ];
    }
  public getAllProducts() :Observable<Product[]>{
    return of(this.products);}

  public deleteProduct(id : number) : Observable<boolean>{
    this.products =this.products.filter(p=>p.id!=id);

    return of(true);
    }

public setPromotion(id: number): Observable<boolean> {
  let product = this.products.find(p => p.id === id);

  if (product !== undefined) {
    product.promotion = !product.promotion; // inverser la valeur
    return of(true);
  } else {
    return throwError(() => new Error("Product not found"));
  }
}
  }

