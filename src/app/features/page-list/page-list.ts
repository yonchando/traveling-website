import { Component } from '@angular/core';
import { Slider } from '@/app/shared/components/slider/slider';
import { Aside } from '@/app/features/page-list/aside/aside';
import { Content } from '@/app/features/page-list/content/content';
import { faker } from '@faker-js/faker/locale/en';

@Component({
    selector: 'app-page-list',
    imports: [Slider, Aside, Content],
    templateUrl: './page-list.html',
    styleUrl: './page-list.css',
})
export class PageList {
    protected readonly faker = faker;
}
