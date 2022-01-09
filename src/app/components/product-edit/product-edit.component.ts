import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductsService} from '../../services/products.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  productID:number;
  productFormGroup!:FormGroup;
  submitted:boolean=false;
  constructor(private fb:FormBuilder, private activatedRoute:ActivatedRoute, private productsService:ProductsService) {
    this.productID=activatedRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    // @ts-ignore
    this.productsService.getProduct(this.productID)
      .subscribe(product=>{
        this.productFormGroup=this.fb.group({
          id:[product.id,Validators.required],
          name:[product.name,Validators.required],
          price:[product.price,Validators.required],
          quantity:[product.quantity,Validators.required],
          selected:[product.selected,Validators.required],
          available:[product.available,Validators.required]
        })

      })
  }

  onUpdateProduct() {
    this.productsService.updateProduct(this.productFormGroup?.value)
      .subscribe(data=>{
        alert("Updated Success")
      })
  }
}
