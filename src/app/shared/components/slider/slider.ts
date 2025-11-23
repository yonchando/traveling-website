import { Component, computed, input } from '@angular/core';
import clsx from 'clsx';

@Component({
    selector: 'app-slider',
    imports: [],
    templateUrl: './slider.html',
    styleUrl: './slider.css',
})
export class Slider {
    src = input('');

    className = input('');

    getClassName = computed(() => clsx('relative', this.className()));

    bottomClassName = input('bg-secondary');

    getButtonClassName = computed(() =>
        clsx('absolute inset-x-0 bottom-0 h-20 w-full rounded-t-4xl md:rounded-t-[80px] z-30', this.bottomClassName()),
    );
}
