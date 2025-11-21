import { Component, input } from '@angular/core';

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
}
