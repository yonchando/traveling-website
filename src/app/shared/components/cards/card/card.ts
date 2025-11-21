import { booleanAttribute, Component, computed, input } from '@angular/core';
import clsx from 'clsx';

@Component({
    selector: 'app-card',
    imports: [],
    templateUrl: './card.html',
    styleUrl: './card.css',
})
export class Card {
    readonly imageUrl = input('');
    readonly title = input('');
    readonly tag = input('');
    readonly duration = input('');
    readonly price = input('');
    readonly className = input('');

    getClass = computed(() =>
        clsx(
            'flex flex-col max-w-75 rounded-2.5xl overflow-hidden h-full',
            this.className(),
        ),
    );

    getTitle = computed(() => {
        const limit = 52;
        let title = this.title();

        if (title.length > limit) {
            return title.slice(0, limit) + '...';
        }

        return title;
    });
}
