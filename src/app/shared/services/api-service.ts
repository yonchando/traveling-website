import { inject, Injectable, signal } from '@angular/core';
import { map, of } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { Paginate, Product } from '@/app/interfaces/product-interface';
import { FakerService } from '@/app/core/fakers/faker-service';
import { HttpClient } from '@angular/common/http';
import { environment } from '@/environments/environment';
import { Category } from '@/app/interfaces/category-interface';
import { Router } from '@angular/router';
import { Comment } from '@/app/interfaces/comment-interface';
import { Country } from '@/app/interfaces/location-interface';
import { User } from '@/app/interfaces/user-interface';

type CommentForm = {
    name: string;
    email: string;
    title: string;
    comment: string;
    rate: number;
};

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    private http = inject(HttpClient);

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

    getProducts(page: number, size: number, params?: Record<string, any>) {
        let url = `${environment.apiUrl}/products`;

        return this.http.get<Paginate<Product[]>>(url, {
            params: this.queryParams(page, size, params),
        });
    }

    getCategories(page: number, size: number, params?: Record<string, any>) {
        return this.http.get<Paginate<Category[]>>(`${environment.apiUrl}/categories`, {
            params: this.queryParams(page, size, params),
        });
    }

    getProduct(slug: string) {
        return this.http
            .get<Product[]>(`${environment.apiUrl}/products`, {
                params: { 'slug:eq': slug },
            })
            .pipe(
                map((products) => {
                    if (products.length > 0) {
                        return products[0];
                    }

                    // this.router.navigate(['/not-found']);

                    return null;
                }),
            );
    }

    subscription(email: string) {
        return this.http.post<{ id: number; email: string }>(`${environment.apiUrl}/emails`, {
            email: email,
        });
    }

    getComments(page: number, size: number, params?: Record<string, any>) {
        let url = `${environment.apiUrl}/comments`;

        return this.http.get<Paginate<Comment[]>>(url, {
            params: this.queryParams(page, size, params),
        });
    }

    comment(value: CommentForm, productId: string) {
        return this.http.post<Comment>(`${environment.apiUrl}/comments`, {
            title: value.title,
            comment: value.comment,
            rating: value.rate + 1,
            productId: productId,
            date: new Date(),
            user: {
                name: value.name,
                email: value.email,
            },
        });
    }

    getCities(page: number, size: number, params?: Record<string, any>) {
        let url = `${environment.apiUrl}/countries`;

        return this.http.get<Paginate<Country[]>>(url, {
            params: this.queryParams(page, size, params),
        });
    }
}
