import { Component, computed, input } from '@angular/core';
import clsx from 'clsx';

@Component({
    selector: 'app-thumbnail',
    imports: [],
    template: `
        <div
            class="relative h-full bg-cover bg-center bg-no-repeat rounded-xl"
            [style]="{
                'background-image': 'url(' + src() + ')',
            }"
        >
            <img [class]="getImageClass()" [src]="src()" alt="title()" />
            <span class="absolute bottom-4 left-4 text-white">{{
                title()
            }}</span>
        </div>
    `,
    host: {
        '[class]': 'getClassName()',
    },
})
export class Thumbnail {
    src = input<string | undefined>('');
    title = input('');

    className = input<string>('');

    width = input('');
    height = input('');

    getImageClass = computed(() =>
        clsx('h-auto w-full rounded-xl invisible', this.width(), this.height()),
    );

    getClassName = computed(() => clsx(this.className()));
}
