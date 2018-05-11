import { Component, OnInit } from '@angular/core';

import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  //Properties:
  pageTitle: string = 'Product List';
  rateInfo: string;
  imageHeith: number = 60;
  showImage: boolean = false;
  listFilter: string;
  errorMessage: string;
 
  products: IProduct[];

  constructor(private _productService: ProductService) { }
  ngOnInit():void{
  	this._productService.getProducts().subscribe(products => this.products = products, error => this.errorMessage = <any>error);
  }
  
  toggleImage():void{ this.showImage = !this.showImage; }

  onRatingClicked(message: string):void{
  	this.rateInfo = message;
  }

}
