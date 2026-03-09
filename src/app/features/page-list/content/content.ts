import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PageService } from '@/app/features/page-list/page-service';
import { Thumbnail } from '@/app/shared/components/thumbnail/thumbnail';
import { RateStar } from '@/app/shared/components/rate-star/rate-star';
import { Button } from '@/app/shared/components/button/button';
import { CurrencyPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-content',
    imports: [Thumbnail, RouterLink, RateStar, Button, CurrencyPipe],
    templateUrl: './content.html',
    styleUrl: './content.css',
})
export class Content {
    router = inject(Router);
    pageService = inject(PageService);

    categories = toSignal(this.pageService.getCategories());
    cities = toSignal(this.pageService.getCities());
    countries = toSignal(this.pageService.getCountries());

    page = signal(1);

    products = computed(() => {
        let products = this.pageService.products();

        const categories = this.categories();
        const cities = this.cities();
        const countries = this.countries();

        if (categories && categories.length > 0) {
            products = products.filter((product) => categories.includes(product.category));
        }

        if (cities && cities.length > 0) {
            products = products.filter((product) => cities.includes(product.city));
        }

        if (countries && countries.length > 0) {
            products = products.filter((product) => countries.includes(product.country));
        }

        const min = this.pageService.min();
        const max = this.pageService.max();

        if (min > 0 && max > 0) {
            products = products.filter((p) => p.price >= min && p.price <= max);
        } else if (min > 0) {
            products = products.filter((p) => p.price >= min);
        } else if (max > 0) {
            products = products.filter((p) => p.price <= max);
        }

        let limit = 20 * this.page();

        return products.slice(0, limit);
    });

    protected nextPage() {
        this.page.update((p) => p + 1);
    }
}
