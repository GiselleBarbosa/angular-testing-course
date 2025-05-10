import { inject, Injectable } from '@angular/core';
import { ProductInterface } from '../models/product-interface';
import { UtilsService } from './utils.service';

@Injectable()
export class ProductsService {
  utilsService = inject(UtilsService);

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

  getProductNames(): string[] {
    return this.utilsService.pluck(this.products, 'name');
  }
}
