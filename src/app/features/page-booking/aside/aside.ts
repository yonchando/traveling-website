import { Component, computed, input } from '@angular/core';
import { Button } from '@/app/shared/components/button/button';
import { ReactiveFormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { Product } from '@/app/interfaces/product-interface';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-aside',
    imports: [Button, ReactiveFormsModule, CurrencyPipe, RouterLink],
    templateUrl: './aside.html',
    styleUrl: './aside.css',
})
export class Aside {
    product = input<Product | null>(null);

    vat = computed(() => ((this.product()?.price ?? 0) * 10) / 100);
    discount = computed(() => {
        return this.product()?.discount ?? 0;
    });
    total = computed(() => {
        let price = this.product()?.price ?? 0;

        let vat = this.vat();

        let discount = this.discount();

        return price - discount + vat;
    });
}
