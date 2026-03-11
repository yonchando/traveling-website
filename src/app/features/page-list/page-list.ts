import { Component, inject, OnInit, signal } from '@angular/core';
import { Slider } from '@/app/shared/components/slider/slider';
import { Aside } from '@/app/features/page-list/aside/aside';
import { Content } from '@/app/features/page-list/content/content';
import { PageService } from '@/app/features/page-list/page-service';
import { Product } from '@/app/interfaces/product-interface';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-page-list',
    imports: [Slider, Aside, Content],
    templateUrl: './page-list.html',
    styleUrl: './page-list.css',
})
export class PageList implements OnInit {
    pageService = inject(PageService);

    route = inject(ActivatedRoute);
    products = signal<Product[]>([]);

    ngOnInit() {
        this.route.queryParams.subscribe((params) => {
            let queryParams: Record<string, any> = {};

            const categories = params['category'] ? params['category'] : [];

            if (categories.length > 0) {
                const category = typeof categories === 'string' ? [categories] : categories;

                this.pageService.categoryCodes.set(category);

                queryParams['category:in'] = category.join(',');
            }

            const countries = params['country'] ? params['country'] : [];

            if (countries.length > 0) {
                const country = typeof countries === 'string' ? [countries] : countries;

                this.pageService.countryCodes.set(country);

                queryParams['country:in'] = country.join(',');
            }

            const minPrice = params['minPrice'] ?? undefined;
            if (minPrice) {
                this.pageService.minPrice.set(minPrice);
                queryParams['price:gte'] = minPrice;
            }

            const maxPrice = params['maxPrice'] ?? undefined;

            if (maxPrice) {
                this.pageService.maxPrice.set(maxPrice);
                queryParams['price:lte'] = maxPrice;
            }

            const page = params['page'] ?? 1;
            this.pageService.getProducts(page, queryParams).subscribe((res) => {
                this.pageService.lastPage.set(res.last);
                if (page > 1) {
                    this.products.set([...this.products(), ...res.data]);
                } else {
                    this.products.set(res.data);
                }
            });
        });
    }
}
