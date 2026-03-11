import { Component, computed, input } from '@angular/core';
import clsx from 'clsx';
import { RouterLink } from '@angular/router';
import { DatePipe, NgOptimizedImage } from '@angular/common';
import { StringLengthPipe } from '@/app/shared/pipes/string-length-pipe';

@Component({
    selector: 'app-card-row',
    imports: [RouterLink, DatePipe, NgOptimizedImage, StringLengthPipe],
    templateUrl: './card-row.html',
})
export class CardRow {
    title = input('');
    date = input<string>('');
    author = input<string>('');
    imageUrl = input('');
    category = input('');

    imageClassName = input('');

    getImageClass = computed(() => clsx('max-w-full rounded-xl', this.imageClassName()));
}
