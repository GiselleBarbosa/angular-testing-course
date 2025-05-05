import { Injectable } from '@angular/core';
import { ProductInterface } from '../models/product-interface';

@Injectable()
export class ProductsService {
  products: ProductInterface[] = [];

  addProduct(product: ProductInterface) {
    this.products = [...this.products, product];
  }

  removeProduct(productId: string) {
    const updateProducts = this.products.filter(
      (product) => product.id !== productId
    );
    this.products = updateProducts;
  }
}
