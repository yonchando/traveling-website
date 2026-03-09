import { Component, computed, inject, signal } from '@angular/core';
import { Button } from '@/app/shared/components/button/button';
import { Checkbox } from '@/app/shared/components/forms/checkbox/checkbox';
import { Input } from '@/app/shared/components/forms/input/input';
import dayjs from 'dayjs';
import { PageService } from '@/app/features/page-list/page-service';
import { FakerService } from '@/app/core/fakers/faker-service';

@Component({
    selector: 'app-aside',
    imports: [Button, Checkbox, Input],
    templateUrl: './aside.html',
    styleUrl: './aside.css',
})
export class Aside {
    fakerService = inject(FakerService);
    pageService = inject(PageService);

    fromDate = signal(dayjs().format('MMMM DD'));
    toDate = signal(dayjs().add(7, 'day').format('MMMM DD'));

    date = computed(() => `${this.fromDate()} ~ ${this.toDate()}`);

    categories = computed(() => {
        return this.fakerService.getCategories(this.pageService.products());
    });
    cities = computed(() => {
        return this.fakerService.getCities(this.pageService.products());
    });
    countries = computed(() => {
        return this.fakerService.getCountries(this.pageService.products());
    });

    filterCountry(event: { e: Event; value: string }) {
        this.pageService.setCountry(event.value);
    }
    filterCity(event: { e: Event; value: string }) {
        this.pageService.setCity(event.value);
    }
    filterCategory(event: { e: Event; value: string }) {
        this.pageService.setCategory(event.value);
    }

    protected setPrice(price: string, onPrice: 'min_price' | 'max_price') {
        if (onPrice === 'min_price') {
            this.pageService.min.set(Number(price));
        } else {
            this.pageService.max.set(Number(price));
        }
    }
}
