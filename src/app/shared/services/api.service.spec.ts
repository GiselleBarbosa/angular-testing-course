import { HttpErrorResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TagInterface } from '../types/tag.interface';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let apiService: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiService],
      imports: [HttpClientTestingModule],
    });

    apiService = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterAll(() => {
    httpTestingController.verify();
  });

  it('deve criar o serviço', () => {
    expect(apiService).toBeTruthy();
  });

  describe('#getTags', () => {
    it('deve retornar uma lista de tags', () => {
      let tags: TagInterface[] | undefined = [];

      apiService.getTags().subscribe((response) => {
        tags = response;
      });
      const req = httpTestingController.expectOne(`${apiService.apiUrl}/tags`);
      req.flush([{ id: 1, name: 'foo' }]);
      expect(tags).toEqual([{ id: 1, name: 'foo' }]);
    });
  });

  describe('#createTag', () => {
    it('deve criar uma tag', () => {
      let tag: TagInterface | undefined;

      apiService.createTag('foo').subscribe((response) => {
        tag = response;
      });
      const req = httpTestingController.expectOne(`${apiService.apiUrl}/tags`);
      req.flush({ id: 1, name: 'foo' });
      expect(tag).toEqual({ id: 1, name: 'foo' });
    });

    it('deve passar o body corretamente', () => {
      let tag: TagInterface | undefined;

      apiService.createTag('foo').subscribe((response) => {
        tag = response;
      });
      const req = httpTestingController.expectOne(`${apiService.apiUrl}/tags`);
      req.flush({ id: 1, name: 'foo' });
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual({ name: 'foo' });
    });

    it('deve lançar um erro se a requisação falhar', () => {
      let actualError: HttpErrorResponse | undefined;

      apiService.createTag('foo').subscribe({
        next: () => {
          fail('A requisição não deveria ter sido bem-sucedida');
        },
        error: (err) => {
          actualError = err;
        },
      });
      const req = httpTestingController.expectOne(`${apiService.apiUrl}/tags`);
      req.flush('Server error', {
        status: 422,
        statusText: 'Unprocessable Entity',
      });

      if (!actualError) {
        throw new Error('Error precisa ser definido');
      }

      expect(actualError.status).toEqual(422);
      expect(actualError.statusText).toEqual('Unprocessable Entity');
      expect(actualError).toBeTruthy();
    });
  });
});
