import { Component, OnInit } from '@angular/core';
import { ProductsService } from "../services/products.service";
import {Product} from "../model/product.model";
@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  products!: Array<Product>;
  errorMessage! :string;

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe({
      next: (data  ) => {
        this.products = data;
      },
      error: (err) => {
        this.errorMessage=err

      }
    });
  }

  handleDeleteProduct(p: Product) {
    let conf=confirm("are you sur ");
    if(conf==false)return;
   this.productsService.deleteProduct(p.id).subscribe({
     next : (data ) => {
       let index=this.products.indexOf(p);
       this.products.splice(index,1);
       }
     })
  }

   handleSetPromotion(p:Product){
     let promo=p.promotion
       this.productsService.setPromotion(p.id).subscribe({
         next :(data)=>{
           p.promotion =! promo;
           },
         error : err => {
           this.errorMessage=err;
           }
         })
     }
}
