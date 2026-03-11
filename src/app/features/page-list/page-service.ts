import { computed, inject, Injectable, signal } from '@angular/core';
import { Product } from '@/app/interfaces/product-interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from '@/app/shared/services';
import { Category } from '@/app/interfaces/category-interface';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class PageService {
    api = inject(ApiService);
    router = inject(Router);

    categoryCodes = signal<string[]>([]);
    countryCodes = signal<string[]>([]);
    minPrice = signal<string>('');
    maxPrice = signal<string>('');
    page = signal(1);
    lastPage = signal(1);

    getProducts(page: number = 1, params?: Record<string, any>) {
        return this.api.getProducts(page, 10, params);
    }

    reload() {
        this.router.navigate(['/page-list'], {
            queryParams: {
                category: this.categoryCodes(),
                country: this.countryCodes(),
                minPrice: this.minPrice(),
                maxPrice: this.maxPrice(),
                page: this.page(),
            },
        });
    }

    clearFilter() {
        this.categoryCodes.set([]);
        this.countryCodes.set([]);
        this.minPrice.set('');
        this.maxPrice.set('');
        this.page.set(1);

        this.reload();
    }

    isLasPage = computed(() => this.page() === this.lastPage());
}
