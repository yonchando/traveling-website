import { Component, computed, inject } from '@angular/core';
import { HomeService } from '@/app/features/home/home-service';
import { Thumbnail } from '@/app/shared/components/thumbnail/thumbnail';
import { Button } from '@/app/shared/components/button/button';
import { Router, RouterLink } from '@angular/router';
import { RateStar } from '@/app/shared/components/rate-star/rate-star';

@Component({
    selector: 'app-content',
    imports: [Thumbnail, Button, RouterLink, RateStar],
    templateUrl: './content.html',
    styleUrl: './content.css',
})
export class Content {
    homeService = inject(HomeService);
    router = inject(Router);

    getFeatures = computed(() => this.homeService.getAll());
}
