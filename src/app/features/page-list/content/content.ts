import { Component, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Thumbnail } from '@/app/shared/components/thumbnail/thumbnail';
import { RateStar } from '@/app/shared/components/rate-star/rate-star';
import { Button } from '@/app/shared/components/button/button';
import { CurrencyPipe } from '@angular/common';
import { Product } from '@/app/interfaces/product-interface';
import { PageService } from '@/app/features/page-list/page-service';

@Component({
    selector: 'app-content',
    imports: [Thumbnail, RouterLink, RateStar, Button, CurrencyPipe],
    templateUrl: './content.html',
    styleUrl: './content.css',
})
export class Content {
    pageService = inject(PageService);

    products = input.required<Product[]>();

    protected nextPage() {
        if (!this.pageService.isLasPage()) {
            this.pageService.page.update((p) => p + 1);

            this.pageService.reload();
        }
    }
}
