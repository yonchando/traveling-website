import { inject, Injectable, signal } from '@angular/core';
import { of } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { Paginate, Product } from '@/app/interfaces/product-interface';
import { FakerService } from '@/app/core/fakers/faker-service';
import { HttpClient } from '@angular/common/http';
import { environment } from '@/environments/environment';
import { Category } from '@/app/interfaces/category-interface';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    username = signal('');

    http = inject(HttpClient);
    router = inject(Router);

    getProducts(page: number, size: number, params?: Record<string, any>) {
        let url = `${environment.apiUrl}/products`;

        return this.http.get<Paginate<Product>>(url, {
            params: this.queryParams(page, size, params),
        });
    }

    getCategories(page: number, size: number, params?: Record<string, any>) {
        return this.http.get<Paginate<Category>>(`${environment.apiUrl}/categories`, {
            params: this.queryParams(page, size, params),
        });
    }

    private queryParams(page: number, size: number, params?: Record<string, any>) {
        let query = {
            _page: page,
            _per_page: size,
        };

        if (params) {
            query = { ...query, ...params };
        }

        return query;
    }
}
