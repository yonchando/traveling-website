import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Slider } from '@/app/shared/components/slider/slider';
import { Feature, HomeService } from '@/app/features/home/home-service';
import { ActivatedRoute } from '@angular/router';
import { RateStar } from '@/app/shared/components/rate-star/rate-star';
import { Thumbnail } from '@/app/shared/components/thumbnail/thumbnail';
import { Aside } from '@/app/features/page-detail/aside/aside';
import { Faq } from '@/app/features/page-detail/faq/faq';
import { Reviews } from '@/app/features/page-detail/reviews/reviews';
import { Card } from '@/app/shared/components/cards/card/card';
import { TimeIcon } from '@/app/shared/components/svg/time/time-icon';
import { UsersIcon } from '@/app/shared/components/svg/users-icon/users-icon';
import { InnerJoinIcon } from '@/app/shared/components/svg/inner-join/inner-join-icon';
import { GlobeIcon } from '@/app/shared/components/svg/globe-icon/globe-icon';
import { NgComponentOutlet } from '@angular/common';
import { faker } from '@faker-js/faker/locale/en';
import clsx from 'clsx';

@Component({
    selector: 'app-page-detail',
    imports: [Slider, RateStar, Thumbnail, Aside, Faq, Reviews, Card, NgComponentOutlet],
    templateUrl: './page-detail.html',
    styleUrl: './page-detail.css',
})
export class PageDetail implements OnInit {
    homeService = inject(HomeService);
    route = inject(ActivatedRoute);

    feature = signal<Feature | undefined>(undefined);

    features = signal<Feature[]>([]);

    getThumbnails = signal<{ imageUrl: string; className: string }[]>([]);
    
    options = computed(() => {
        return [
            {
                label: 'Duration',
                value: this.feature()?.duration,
                icon: TimeIcon,
            },
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
        const title = this.route.snapshot.paramMap.get('title');

        this.homeService.getAll().subscribe({
            next: (features) => {
                const f = features.find((item) => item.title.toLowerCase() === title?.toLowerCase());
                this.feature.set(f);

                this.features.set(features.filter((item) => item.title.toLowerCase() !== title?.toLowerCase()));
            },
        });

        this.getThumbnails.set([
            {
                imageUrl: faker.image.url({ width: 1350, height: 650 }),
                className: 'col-span-12 md:col-span-6 lg:row-span-2',
            },
            {
                imageUrl: faker.image.url({ width: 1350, height: 650 }),
                className: 'col-span-12 md:col-span-6 lg:col-span-6 lg:h-[15.625rem]',
            },
            {
                imageUrl: faker.image.url({ width: 1350, height: 650 }),
                className: 'col-span-12 md:col-span-6 lg:col-span-3',
            },
            {
                imageUrl: faker.image.url({ width: 1350, height: 650 }),
                className: 'col-span-12 md:col-span-6 lg:col-span-3',
            },
        ]);

    }
}
