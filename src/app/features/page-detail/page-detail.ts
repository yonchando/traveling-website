import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Slider } from '@/app/shared/components/slider/slider';
import { RateStar } from '@/app/shared/components/rate-star/rate-star';
import { Thumbnail } from '@/app/shared/components/thumbnail/thumbnail';
import { Aside } from '@/app/features/page-detail/aside/aside';
import { Faq } from '@/app/features/page-detail/faq/faq';
import { Reviews } from '@/app/features/page-detail/reviews/reviews';
import { Card } from '@/app/shared/components/cards/card/card';
import { UsersIcon } from '@/app/shared/components/svg/users-icon/users-icon';
import { InnerJoinIcon } from '@/app/shared/components/svg/inner-join/inner-join-icon';
import { GlobeIcon } from '@/app/shared/components/svg/globe-icon/globe-icon';
import { NgComponentOutlet } from '@angular/common';
import { Product } from '@/app/interfaces/product-interface';
import { ApiService } from '@/app/shared/services';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-page-detail',
    imports: [Slider, RateStar, Thumbnail, Aside, Faq, Reviews, Card, NgComponentOutlet],
    templateUrl: './page-detail.html',
    styleUrl: './page-detail.css',
})
export class PageDetail implements OnInit {
    api = inject(ApiService);
    route = inject(ActivatedRoute);
    router = inject(Router);

    product = signal<Product | null>(null);

    youMaybeLikes = signal<any[]>([]);

    getThumbnails = signal<{ imageUrl: string; className: string }[]>([]);

    options = computed(() => {
        return [
            {
                label: 'Group Size',
                value: '10 people',
                icon: UsersIcon,
            },
            {
                label: 'Ages',
                value: '18-99',
                icon: InnerJoinIcon,
            },
            {
                label: 'Language',
                value: 'English, Japanese',
                icon: GlobeIcon,
            },
        ];
    });

    ngOnInit() {
        this.api.getProduct(this.route.snapshot.params['slug']).subscribe({
            next: (product) => {
                this.product.set(product);
            },
        });
    }
}
