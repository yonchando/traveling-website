import { booleanAttribute, Component, computed, input } from '@angular/core';
import clsx from 'clsx';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { Button } from '@/app/shared/components/button/button';
import { StringLengthPipe } from '@/app/shared/pipes/string-length-pipe';

@Component({
    selector: 'app-card',
    imports: [RouterLink, CurrencyPipe, NgOptimizedImage, Button, StringLengthPipe],
    templateUrl: './card.html',
    styleUrl: './card.css',
})
export class Card {
    readonly imageUrl = input('');
    readonly title = input.required<string>();
    readonly slug = input.required<string>();
    readonly tag = input('');
    readonly duration = input('');
    readonly price = input<number>(0);
    readonly className = input('');

    getClass = computed(() =>
        clsx('flex h-full max-w-full flex-col overflow-hidden rounded-2.5xl md:max-w-75', this.className()),
    );
}
