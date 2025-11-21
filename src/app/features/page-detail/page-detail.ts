import { Component, inject, OnInit, signal } from '@angular/core';
import { Slider } from '@/app/shared/components/slider/slider';
import { Feature, HomeService } from '@/app/features/home/home-service';
import { ActivatedRoute } from '@angular/router';
import { RateStar } from '@/app/shared/components/rate-star/rate-star';
import { Thumbnail } from '@/app/shared/components/thumbnail/thumbnail';
import { Aside } from '@/app/features/page-detail/aside/aside';

@Component({
    selector: 'app-page-detail',
    imports: [Slider, RateStar, Thumbnail, Aside],
    templateUrl: './page-detail.html',
    styleUrl: './page-detail.css',
})
export class PageDetail implements OnInit {
    homeService = inject(HomeService);
    route = inject(ActivatedRoute);

    feature = signal<Feature | undefined>(undefined);

    ngOnInit() {
        const title = this.route.snapshot.paramMap.get('title');

        const f = this.homeService
            .getAll()
            .find((item) => item.title === title);

        this.feature.set(f);
    }
}
