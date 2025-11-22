import { Component, inject, OnInit, signal } from '@angular/core';
import { Feature, HomeService } from '@/app/features/home/home-service';
import { Thumbnail } from '@/app/shared/components/thumbnail/thumbnail';
import { Button } from '@/app/shared/components/button/button';
import { Router, RouterLink } from '@angular/router';
import { RateStar } from '@/app/shared/components/rate-star/rate-star';
import { faker } from '@faker-js/faker/locale/en';

@Component({
    selector: 'app-content',
    imports: [Thumbnail, Button, RouterLink, RateStar],
    templateUrl: './content.html',
    styleUrl: './content.css',
})
export class Content implements OnInit {
    homeService = inject(HomeService);
    router = inject(Router);

    getFeatures = signal<Feature[]>([]);

    ngOnInit() {
        this.homeService.getAll().subscribe({
            next: (features) => {
                features.forEach((item) => {
                    if (!item.content) {
                        item.content = faker.lorem.paragraphs(1);
                    }
                    if (!item.rating) {
                        item.rating = faker.number.float({ min: 1, max: 5, fractionDigits: 1 });
                    }
                    if (item.reviewCount) {
                        item.reviewCount = faker.number.int({ max: 1_000 });
                    }
                });
                this.getFeatures.set(features);
            },
        });
    }
}
