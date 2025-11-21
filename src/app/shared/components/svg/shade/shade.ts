import { Component, computed, input, numberAttribute } from '@angular/core';
import clsx from 'clsx';

type ShadeType = 'hero-card' | 'footer';

@Component({
    selector: 'app-shade',
    imports: [],
    templateUrl: './shade.html',
    host: {
        '[class]': 'getClassName()',
    },
})
export class Shade {
    className = input<string>('');

    width = input('');
    height = input('');

    getClassName = computed(() =>
        clsx(this.className(), this.height(), this.width()),
    );

    shade = input<ShadeType>('hero-card');
}
