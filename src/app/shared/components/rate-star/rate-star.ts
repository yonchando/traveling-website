import { Component, computed, input, numberAttribute } from '@angular/core';
import clsx from 'clsx';
import { range } from '@/app/shared/ultils/iterator-util';

@Component({
    selector: 'app-rate-star',
    imports: [],
    templateUrl: './rate-star.html',
    host: {
        '[class]': 'getClass()',
    },
})
export class RateStar {
    rate = input.required({ transform: numberAttribute });

    count = input.required();

    className = input('');

    getClass = computed(() =>
        clsx('inline-flex flex-col-reverse items-center gap-2 text-warning md:flex-row', this.className()),
    );

    getFullStar = computed(() => range(Math.floor(this.rate())));

    getHalfStar = computed(() => Math.floor(this.rate()) < this.rate());

    getEmptyStar = computed(() => range(Math.floor(5 - this.rate())));
}
