import { TestBed } from '@angular/core/testing';
import { ProductInterface } from '../models/product-interface';
import { ProductsService } from './products.service';

describe('#Service: Products', () => {
  let productsService: ProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductsService],
    });

    productsService = TestBed.inject(ProductsService);
  });

  it('deve criar o service.', () => {
    expect(productsService).toBeTruthy();
  });

  describe('#addProduct', () => {
    it('deve adicionar um produto', () => {
      const product: ProductInterface = { id: '1', name: 'cafeteira' };
      productsService.addProduct(product);
      expect(productsService.products$.getValue().length).toBe(1);
      expect(productsService.products$.getValue()).toEqual([
        { id: '1', name: 'cafeteira' },
      ]);
    });
  });

  describe('#removeProduct', () => {
    it('deve remover um produto', () => {
      productsService.products$.next([{ id: '1', name: 'Produto 1' }]);
      productsService.removeProduct('1');
      expect(productsService.products$.getValue()).toEqual([]);
    });
  });
});
