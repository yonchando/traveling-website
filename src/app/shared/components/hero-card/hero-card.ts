import { Component, computed, input } from '@angular/core';
import clsx from 'clsx';

@Component({
    selector: 'app-hero-card',
    imports: [],
    templateUrl: './hero-card.html',
    styles: `
        .hero-card {
            background-image: var(--hero-card-bg);
        }
    `,
})
export class HeroCard {
    bg = input();
    className = input('');

    getClassName = computed(() => clsx('hero-card grid grid-cols-2 rounded-xl', this.className()));
}
