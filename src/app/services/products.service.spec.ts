import { TestBed } from '@angular/core/testing';
import { ProductInterface } from '../models/product-interface';
import { ProductsService } from './products.service';
import { UtilsService } from './utils.service';

describe('#Service: Products', () => {
  let productsService: ProductsService;
  let utilsService: UtilsService;
  // const utilsServiceMock = {
  //   pluck: jest.fn(),
  // };

  beforeEach(() => {
    TestBed.configureTestingModule({
      /*providers: [ProductsService, UtilsService], */
      providers: [
        ProductsService,
        UtilsService,
        // { provide: UtilsService, useValue: utilsServiceMock },
      ],
    });

    productsService = TestBed.inject(ProductsService);
    utilsService = TestBed.inject(UtilsService);
  });

  it('deve criar o service.', () => {
    expect(productsService).toBeTruthy();
  });

  describe('#addProduct', () => {
    it('deve adicionar um produto', () => {
      const product: ProductInterface = { id: '1', name: 'Produto 1' };
      productsService.addProduct(product);
      expect(productsService.products.length).toBe(1);
      expect(productsService.products).toEqual([
        { id: '1', name: 'Produto 1' },
      ]);
    });
  });

  describe('#removeProduct', () => {
    it('deve remover um produto', () => {
      productsService.products = [{ id: '1', name: 'Produto 1' }];
      productsService.removeProduct('1');
      expect(productsService.products).toEqual([]);
    });
  });

  describe('#getProductsNames', () => {
    it('deve retornar os nomes dos produtos', () => {
      jest.spyOn(utilsService, 'pluck');
      productsService.products = [{ id: '1', name: 'Produto 1' }];
      productsService.getProductNames();
      expect(utilsService.pluck).toHaveBeenCalledWith(
        productsService.products,
        'name'
      );

      // utilsServiceMock.pluck.mockReturnValue(['foo']);
      // expect(productsService.getProductNames()).toEqual(['foo']);
    });
  });
});
