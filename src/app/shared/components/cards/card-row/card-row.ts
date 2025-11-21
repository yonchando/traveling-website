import { Component, computed, input } from '@angular/core';
import clsx from 'clsx';

@Component({
    selector: 'app-card-row',
    imports: [],
    templateUrl: './card-row.html',
})
export class CardRow {
    title = input('');
    date = input<string>('');
    author = input<string>('');
    imageUrl = input('');
    tag = input('');

    imageClassName = input('');

    getImageClass = computed(() =>
        clsx('max-w-full rounded-xl', this.imageClassName()),
    );
}
