import { Component, computed, inject, signal } from '@angular/core';
import { Slider } from '@/app/shared/components/slider/slider';
import { Button } from '@/app/shared/components/button/button';
import { Thumbnail } from '@/app/shared/components/thumbnail/thumbnail';
import { HeroCard } from '@/app/shared/components/hero-card/hero-card';
import { toSignal } from '@angular/core/rxjs-interop';
import { HomeService } from '@/app/features/home/home-service';
import { Shade } from '@/app/shared/components/svg/shade/shade';
import { Input } from '@/app/shared/components/forms/input/input';
import { Card } from '@/app/shared/components/cards/card/card';
import { CardColumn } from '@/app/shared/components/cards/card-column/card-column';
import { CardRow } from '@/app/shared/components/cards/card-row/card-row';

@Component({
    selector: 'app-home',
    imports: [
        Slider,
        Button,
        Thumbnail,
        HeroCard,
        Shade,
        Input,
        Card,
        CardColumn,
        CardRow,
    ],
    templateUrl: './home.html',
    styleUrl: './home.css',
})
export class Home {
    homeService = inject(HomeService);

    category = signal('adventure');

    categories = toSignal(this.homeService.getCategories());
    features = toSignal(this.homeService.getFeatures());
    topAttractions = toSignal(this.homeService.topAttractions());

    travelArticles = toSignal(this.homeService.getArticles());
    

    protected readonly top = top;
}
