import { Component, OnInit } from '@angular/core';
import { ProductsService } from "../services/products.service";
import {Product} from "../model/product.model";
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  products!: Array<Product>;
  errorMessage! :string;
  searchFormGroup!: FormGroup;


  constructor(private productsService: ProductsService, private fb : FormBuilder) {}

  ngOnInit(): void {
    this.searchFormGroup=this.fb.group({
      keyword : this.fb.control(null)})
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
   handleSearchProducts(){
     let keyword= this.searchFormGroup.value.keyword;
     this.productsService.searchProducts(keyword).subscribe({
       next:(data)=> {
         this.products=data;
         }
     })
}
}
