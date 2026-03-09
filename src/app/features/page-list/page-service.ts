import { Injectable, signal } from '@angular/core';
import { Product } from '@/app/interfaces/product-interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PageService {
    private categories$ = new BehaviorSubject<string[]>([]);
    private cities$ = new BehaviorSubject<string[]>([]);
    private countries$ = new BehaviorSubject<string[]>([]);
    min = signal(0);
    max = signal(0);

    products = signal<Product[]>([]);

    private updateArray<T>(data: Array<T>, value: T) {
        let items = [...data];

        const index = items.indexOf(value);

        if (index != -1) {
            items = items.filter((item) => item != value);
        } else {
            items.push(value);
        }

        return [...items];
    }

    getCategories() {
        return this.categories$;
    }
    getCities() {
        return this.cities$;
    }
    getCountries() {
        return this.countries$;
    }

    setCategory(category: string) {
        this.categories$.next([...this.updateArray(this.categories$.value, category)]);
    }
    setCity(city: string) {
        this.cities$.next([...this.updateArray(this.cities$.value, city)]);
    }
    setCountry(country: string) {
        this.countries$.next([...this.updateArray(this.countries$.value, country)]);
    }
}
