import { Component, computed, input, numberAttribute } from '@angular/core';
import clsx from 'clsx';

type ShadeType = 'hero-card' | 'footer';

@Component({
    selector: 'icon-app-store',
    imports: [],
    templateUrl: './app-store.html',
    host: {
        '[class]': 'getClassName()',
    },
})
export class AppStore {
    className = input<string>('');

    width = input('24');
    height = input('24');

    getClassName = computed(() =>
        clsx(this.className(), this.height(), this.width()),
    );

    shade = input<ShadeType>('hero-card');
}
