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

@Component({
    selector: 'app-page-detail',
    imports: [
        Slider,
        RateStar,
        Thumbnail,
        Aside,
        Faq,
        Reviews,
        Card,
        NgComponentOutlet,
    ],
    templateUrl: './page-detail.html',
    styleUrl: './page-detail.css',
})
export class PageDetail implements OnInit {
    homeService = inject(HomeService);
    route = inject(ActivatedRoute);

    feature = signal<Feature | undefined>(undefined);

    features = signal<Feature[]>([]);

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
                const f = features.find(
                    (item) => item.title.toLowerCase() === title?.toLowerCase(),
                );
                this.feature.set(f);

                this.features.set(
                    features.filter(
                        (item) =>
                            item.title.toLowerCase() !== title?.toLowerCase(),
                    ),
                );
            },
        });
    }
}
