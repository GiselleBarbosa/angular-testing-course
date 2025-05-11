import { Injectable } from '@angular/core';
import { ProductInterface } from '../models/product-interface';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ProductsService {
  products$ = new BehaviorSubject<ProductInterface[]>([]);

  addProduct(product: ProductInterface) {
    this.products$.next([...this.products$.getValue(), product]);
  }

  removeProduct(productId: string) {
    const updateProducts = this.products$
      .getValue()
      .filter((product) => product.id !== productId);
    this.products$.next(updateProducts);
  }
}
