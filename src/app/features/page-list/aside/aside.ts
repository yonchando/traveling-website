import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Button } from '@/app/shared/components/button/button';
import { Checkbox } from '@/app/shared/components/forms/checkbox/checkbox';
import { Input } from '@/app/shared/components/forms/input/input';
import dayjs from 'dayjs';
import { PageService } from '@/app/features/page-list/page-service';
import { FakerService } from '@/app/core/fakers/faker-service';
import { Category } from '@/app/interfaces/category-interface';
import { ApiService } from '@/app/shared/services';
import { City, Country } from '@/app/interfaces/location-interface';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-aside',
    imports: [Button, Checkbox, Input, FormsModule],
    templateUrl: './aside.html',
    styleUrl: './aside.css',
})
export class Aside implements OnInit {
    pageService = inject(PageService);
    api = inject(ApiService);

    categories = signal<Category[]>([]);
    countries = signal<Country[]>([]);

    ngOnInit() {
        this.api.getCategories(1, 25).subscribe((res) => {
            this.categories.set(res.data);
        });
        this.api.getCities(1, 10).subscribe((res) => {
            this.countries.set(res.data);
        });
    }

    filterCategory(item: { isChecked: boolean; value: Category }) {
        if (item.isChecked) {
            this.pageService.categoryCodes.update((cate) => {
                cate.push(item.value.code);

                return [...cate];
            });
        } else {
            this.pageService.categoryCodes.update((cate) => {
                const index = cate.indexOf(item.value.code);
                cate.splice(index, 1);

                return [...cate];
            });
        }

        this.pageService.reload();
    }

    filterCountry(item: { isChecked: boolean; value: Country }) {
        if (item.isChecked) {
            this.pageService.countryCodes.update((country) => {
                country.push(item.value.code);

                return [...country];
            });
        } else {
            this.pageService.countryCodes.update((country) => {
                const index = country.indexOf(item.value.code);
                country.splice(index, 1);

                return [...country];
            });
        }

        this.pageService.reload();
    }

    protected setPrice(item: { e: Event; value: any }, onPrice: 'min_price' | 'max_price') {
        if (isNaN(Number(item.value))) {
            return;
        }

        if (onPrice === 'min_price') {
            this.pageService.minPrice.set(item.value);
        } else {
            this.pageService.maxPrice.set(item.value);
        }

        setTimeout(() => {
            this.pageService.reload();
        }, 1000);
    }

    protected clearFilter() {
        this.pageService.clearFilter();
    }
}
