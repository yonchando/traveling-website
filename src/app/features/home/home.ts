import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Slider } from '@/app/shared/components/slider/slider';
import { Button } from '@/app/shared/components/button/button';
import { Card } from '@/app/shared/components/cards/card/card';
import { Product } from '@/app/interfaces/product-interface';
import { CardRow } from '@/app/shared/components/cards/card-row/card-row';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService } from '@/app/shared/services/api-service';
import { Category } from '@/app/interfaces/category-interface';
import { concatMap, tap } from 'rxjs';
import { TrendingDestinations } from '@/app/features/home/trending-destinations/trending-destinations';
import { Promotion } from '@/app/features/home/promotion/promotion';
import { TopAttraction } from '@/app/features/home/top-attraction/top-attraction';
import { Reviews } from '@/app/features/home/reviews/reviews';
import { Subscription } from '@/app/features/home/subscription/subscription';

@Component({
    selector: 'app-home',
    imports: [
        Slider,
        Button,
        Card,
        CardRow,
        ReactiveFormsModule,
        RouterLink,
        TrendingDestinations,
        Promotion,
        TopAttraction,
        Reviews,
        Subscription,
    ],
    templateUrl: './home.html',
    styleUrl: './home.css',
})
export class Home implements OnInit {
    productService = inject(ApiService);

    category = signal('');

    categories = signal<Category[]>([]);

    products = signal<Product[]>([]);

    popularTours = signal<Product[]>([]);

    getFeatures = computed(() => {
        return this.products();
    });

    travelArticles = computed(() => {
        return this.products().slice(8, 8 + 12);
    });

    ngOnInit() {
        this.productService
            .getCategories(0, 4)
            .pipe(
                tap((res) => {
                    this.categories.set(res.data);

                    if (res.data.length > 0) {
                        this.category.set(res.data[0].code);
                    }
                }),
                concatMap(() => {
                    return this.productService
                        .getProducts(0, 4, {
                            category: this.category(),
                        })
                        .pipe(
                            tap((res) => {
                                this.products.set(res.data);
                            }),
                        );
                }),
            )
            .subscribe();

        this.productService.getProducts(0, 8).subscribe((res) => {
            this.popularTours.set(res.data);
        });
    }

    changeFeatureCategory(categoryCode: string) {
        this.productService.getProducts(0, 4, { category: categoryCode }).subscribe((res) => {
            this.products.set(res.data);
            this.category.set(categoryCode);
        });
    }
}
