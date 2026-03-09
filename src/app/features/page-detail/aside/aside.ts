import { Component, computed, input, signal, WritableSignal } from '@angular/core';
import { Button } from '@/app/shared/components/button/button';
import { ReactiveFormsModule } from '@angular/forms';
import { Checkbox } from '@/app/shared/components/forms/checkbox/checkbox';
import { CurrencyPipe } from '@angular/common';
import dayjs from 'dayjs';
import { Product } from '@/app/interfaces/product-interface';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-aside',
    imports: [Button, ReactiveFormsModule, Checkbox, CurrencyPipe, RouterLink],
    templateUrl: './aside.html',
    styleUrl: './aside.css',
})
export class Aside {
    protected readonly dayjs = dayjs;

    product = input<Product | null>(null);

    adult = signal(1);
    young = signal(0);
    children = signal(0);

    total = computed(() => {
        let extra = 0;

        return (this.product()?.price ?? 0) + this.adult() * 200 + this.young() * 150 + this.children() * 80 + extra;
    });

    addExtraOptionChecked = signal({
        service1: false,
        service2: false,
    });

    updateTicket(ticket: WritableSignal<number>, operator: '+' | '-') {
        ticket.update((value) => (operator === '+' ? value + 1 : Math.max(value - 1, 0)));
    }

    addExtra(e: Event, number: number) {
        const el = e.target as HTMLInputElement;

        if (el.checked) {
            if (number === 1) {
                this.addExtraOptionChecked().service1 = true;
            } else {
                this.addExtraOptionChecked().service1 = true;
            }
        } else {
            if (number === 1) {
                this.addExtraOptionChecked().service1 = false;
            } else {
                this.addExtraOptionChecked().service1 = false;
            }
        }
    }
}
