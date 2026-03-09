import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { range } from '@/app/shared/ultils/iterator-util';
import { Product } from '@/app/interfaces/product-interface';
import { faker } from '@faker-js/faker/locale/en';
import dayjs from 'dayjs';

type ImageSize = {
    height: number;
    width: number;
};

@Injectable({
    providedIn: 'root',
})
export class FakerService {
    categories = [
        'Explorer',
        'Natural Beauty',
        'Photography',
        'Festivals',
        'Adventurers',
        'Historical Discoveries',
        'Wildlife Watching',
        'Beach Relaxation',
        'Cultural Exploration',
    ] as const;

    getProducts(size: number = 200, imageSize: ImageSize = { height: 199, width: 278 }) {
        let products: Product[] = [];

        let cities = [];

        for (const i of range(10)) {
            cities.push(faker.location.city());
        }

        let countries = [];

        for (const i of range(10)) {
            countries.push(faker.location.country());
        }

        for (const i of range(size)) {
            const index = faker.number.int({
                min: 0,
                max: this.categories.length - 1,
            });
            let category = this.categories[index];

            const title = 'Trip to ' + faker.location.city() + `, ${faker.location.country()}`;

            const id = faker.number.int({ min: 10, max: 16 });

            const price = faker.number.float({ min: 100, max: 10000 });

            products.push({
                id: i,
                title: title,
                price: price,
                category: category,
                duration: `${faker.number.int({ min: 1, max: 12 })}h ${faker.number.int({ min: 1, max: 60 })}mm`,
                imageUrl: `https://picsum.photos/id/${id}/${imageSize.width}/${imageSize.height}`,
                tag: faker.airline.airplane().name,
                visitedCount: faker.number.int({ min: 100, max: 100000 }),
                author: faker.company.name(),
                date: dayjs(faker.date.soon({ days: 10 })).format('YYYY-MM-DD HH:mm:ss'),

                city: cities[faker.number.int({ min: 0, max: cities.length - 1 })],
                country: countries[faker.number.int({ min: 0, max: countries.length - 1 })],

                content: faker.lorem.paragraph(4),
                discount: faker.number.binary() ? (price * faker.number.int({ min: 1, max: 10 })) / 100 : 0,
                rating: faker.number.int({ min: 1, max: 5 }),
                reviewCount: faker.number.int({ min: 0, max: 100000 }),
            });
        }

        return of([...products]);
    }

    getCategories(products: Product[], size: number = 15) {
        let categories: string[] = [];

        products.forEach((p, i) => {
            if (i < size && !categories.includes(p.category)) {
                categories.push(p.category);
            }
        });

        return categories;
    }

    getCities(products: Product[], size: number = 15) {
        let cities: string[] = [];

        products.forEach((p, i) => {
            if (i < size && !cities.includes(p.city)) {
                cities.push(p.city);
            }
        });

        return cities;
    }

    getCountries(products: Product[], size: number = 15) {
        let countries: string[] = [];

        products.forEach((p, i) => {
            if (i < size && !countries.includes(p.country)) {
                countries.push(p.country);
            }
        });

        return countries;
    }
}
