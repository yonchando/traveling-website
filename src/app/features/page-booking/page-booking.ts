import { Component, inject, OnInit, signal } from '@angular/core';
import { Slider } from '@/app/shared/components/slider/slider';
import { Product } from '@/app/interfaces/product-interface';
import { FakerService } from '@/app/core/fakers/faker-service';
import { Aside } from '@/app/features/page-booking/aside/aside';
import { faker } from '@faker-js/faker/locale/en';
import dayjs from 'dayjs';
import { Input } from '@/app/shared/components/forms/input/input';
import { Select } from '@/app/shared/components/forms/select/select';

@Component({
    selector: 'app-page-booking',
    imports: [Slider, Aside, Input, Select],
    templateUrl: './page-booking.html',
    styleUrl: './page-booking.css',
})
export class PageBooking implements OnInit {
    fakerService = inject(FakerService);

    product = signal<Product | null>(null);

    id = faker.string.nanoid(8);
    city = faker.location.city();
    country = faker.location.country();
    now = dayjs();

    ngOnInit() {
        this.fakerService.getProducts(1).subscribe((products) => this.product.set(products[0]));
    }

    protected time() {
        return dayjs(this.product()?.date).format('HH:mm');
    }

    protected date() {
        return dayjs(this.product()?.date).format('DD,MMM YYYY');
    }

    protected options = [
        {
            label: "I'm a main guest",
            value: 1,
        },
        {
            label: "I'm booking for someone else.",
            value: 2,
        },
    ];
}
