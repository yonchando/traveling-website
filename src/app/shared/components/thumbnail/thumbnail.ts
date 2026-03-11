import { Component, computed, input } from '@angular/core';
import clsx from 'clsx';
import { NgOptimizedImage } from '@angular/common';

@Component({
    selector: 'app-thumbnail',
    imports: [NgOptimizedImage],
    template: `
        <div
            class="relative h-full rounded-xl bg-cover bg-center bg-no-repeat"
            [style]="{
                'background-image': 'url(' + imageUrl() + ')',
            }">
            <img
                [class]="getImageClass()"
                [ngSrc]="imageUrl() ?? ''"
                [alt]="title()"
                [width]="width()"
                [height]="height()"
                [loading]="loading()" />
            <span class="absolute bottom-4 left-4 w-full max-w-full text-wrap text-white">
                <span class="relative">
                    {{ title() }}
                </span>
            </span>
        </div>
    `,
    host: {
        '[class]': 'getClassName()',
    },
})
export class Thumbnail {
    imageUrl = input<string | undefined>('');
    title = input('');
    loading = input<'lazy' | 'eager' | 'auto'>('auto');

    className = input<string>('');

    width = input('100');
    height = input('100');

    getImageClass = computed(() =>
        clsx(
            'invisible rounded-xl',
            {
                'h-auto': !this.height(),
                'w-full': !this.width(),
            },
            this.width(),
            this.height(),
        ),
    );

    getClassName = computed(() => clsx(this.className()));
}
