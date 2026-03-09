import { Component } from '@angular/core';

@Component({
    selector: 'icon-arrow-up',
    imports: [],
    template: `
        <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                class="stroke-white"
                d="M7.75 16.75V0.75"
                stroke="#212121"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round" />
            <path
                class="stroke-white"
                d="M0.75 8.75L7.75 0.75L14.75 8.75"
                stroke="#212121"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round" />
        </svg>
    `,
})
export class IconArrowUp {}
