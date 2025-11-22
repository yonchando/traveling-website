import { Component, computed, input } from '@angular/core';
import clsx from 'clsx';

@Component({
    selector: 'app-thumbnail',
    imports: [],
    template: `
        <div
            class="relative h-full rounded-xl bg-cover bg-center bg-no-repeat"
            [style]="{
                'background-image': 'url(' + src() + ')',
            }">
            <img [class]="getImageClass()" [src]="src()" alt="title()" />
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
    src = input<string | undefined>('');
    title = input('');

    className = input<string>('');

    width = input('');
    height = input('');

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
