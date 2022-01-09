import { Component, OnInit } from '@angular/core';
import {ProductsService} from '../../services/products.service';
import {Product} from '../../model/products.model';
import {Observable, of} from 'rxjs';
import {catchError, map, startWith} from 'rxjs/operators';
import {AppDataState, DataStateEnum} from '../../state/product.state';
import {Router} from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
products$: Observable<AppDataState<Product[]>> | undefined;
 readonly DataStateEnum=DataStateEnum;
  constructor(private productsService:ProductsService, private router:Router) { }

  ngOnInit(): void {
  }

  onGetAllProducts() {
    // @ts-ignore
    this.products$ = this.productsService.getAllProducts()
      .pipe(
        map(data => ({dataState: DataStateEnum.LOADED, data: data})),
        startWith({datastate: DataStateEnum.LOADING}),
        catchError(err => of({dataState: DataStateEnum.ERROR, errorMessage: err.message}))
      );
  }

  onGetSelectedProducts() {
    // @ts-ignore
    this.products$ = this.productsService.getSelectedProducts()
      .pipe(
        map(data => ({dataState: DataStateEnum.LOADED, data: data})),
        startWith({datastate: DataStateEnum.LOADING}),
        catchError(err => of({dataState: DataStateEnum.ERROR, errorMessage: err.message}))
      );
  }

  onGetAvailableProducts() {
    // @ts-ignore
    this.products$ = this.productsService.getAvailableProducts()
      .pipe(
        map(data => ({dataState: DataStateEnum.LOADED, data: data})),
        startWith({datastate: DataStateEnum.LOADING}),
        catchError(err => of({dataState: DataStateEnum.ERROR, errorMessage: err.message}))
      );
  }

  onSearch(dataForm: any) {
    // @ts-ignore
    this.products$ = this.productsService.searchProducts(dataForm.keyWord)
      .pipe(
        map(data => ({dataState: DataStateEnum.LOADED, data: data})),
        startWith({datastate: DataStateEnum.LOADING}),
        catchError(err => of({dataState: DataStateEnum.ERROR, errorMessage: err.message}))
      );

  }

  onSelect(p: Product) {
    this.productsService.select(p)
      .subscribe(data=>{
        p.selected=data.selected;
      })
  }

  onDelete(p: Product) {
    let v=confirm("Etes vous sure pour la suppression!!!!!")
    if (v==true)
    this.productsService.deleteProduct(p)
      .subscribe(data=>{
        this.onGetAllProducts();
      })
  }

  onNewProducts() {
    this.router.navigateByUrl("/NewProduct");
  }

  onUpdate(p: Product) {
    this.router.navigateByUrl("/updateProduct/"+p.id);

  }
}
