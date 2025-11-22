import { Component, inject, OnInit, signal } from '@angular/core';
import { Feature, HomeService } from '@/app/features/home/home-service';
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
export class Content implements OnInit {
    homeService = inject(HomeService);
    router = inject(Router);

    getFeatures = signal<Feature[]>([]);

    ngOnInit() {
        this.homeService.getAll().subscribe({
            next: (features) => this.getFeatures.set(features),
        });
    }
}
