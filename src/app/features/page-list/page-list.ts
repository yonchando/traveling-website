import { Component, inject, OnInit } from '@angular/core';
import { Slider } from '@/app/shared/components/slider/slider';
import { Aside } from '@/app/features/page-list/aside/aside';
import { Content } from '@/app/features/page-list/content/content';
import { PageService } from '@/app/features/page-list/page-service';
import { FakerService } from '@/app/core/fakers/faker-service';

@Component({
    selector: 'app-page-list',
    imports: [Slider, Aside, Content],
    templateUrl: './page-list.html',
    styleUrl: './page-list.css',
})
export class PageList implements OnInit {
    pageService = inject(PageService);
    fakerService = inject(FakerService);

    ngOnInit() {
        this.fakerService.getProducts().subscribe((products) => {
            this.pageService.products.set(products);
        });
    }
}
