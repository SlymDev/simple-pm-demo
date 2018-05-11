import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { IProduct } from './product';

@Injectable()
export class ProductService{
	private _productUrl = 'assets/products/products.json';
	
    constructor(private _http: Http) { }

	getProducts(): Observable<IProduct[]>{
		return this._http.get(this._productUrl)
							.map((response:Response) => <IProduct[]> response.json())
							.do(data => console.log('All: ' + JSON.stringify(data)))
							.catch(this.handleError);
	}

	getProduct(id: number): Observable<IProduct> {
        return this.getProducts()
            .map((products: IProduct[]) => products.find(p => p.productId === id));
    }
    private handleError(err: HttpErrorResponse) {
        let errorMessage = '';
        if (err.error instanceof Error) {
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return Observable.throw(errorMessage);
    }
}