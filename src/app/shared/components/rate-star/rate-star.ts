import { Component, computed, input, numberAttribute } from '@angular/core';
import clsx from 'clsx';

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

    getHalfStar = computed(() => {
        return Math.floor(this.rate()) < this.rate();
    });

    getClass = computed(() =>
        clsx('inline-flex gap-2 items-center text-warning', this.className()),
    );

    range(from: number = 0, to: number) {
        let result = [];

        for (let i = from; i < to; i++) {
            result.push(i);
        }

        return result;
    }

    protected readonly Math = Math;
}
