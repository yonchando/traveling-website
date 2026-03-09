import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Slider } from '@/app/shared/components/slider/slider';
import { Button } from '@/app/shared/components/button/button';
import { Thumbnail } from '@/app/shared/components/thumbnail/thumbnail';
import { HeroCard } from '@/app/shared/components/hero-card/hero-card';
import { HomeService } from '@/app/features/home/home-service';
import { Shade } from '@/app/shared/components/svg/shade/shade';
import { Input } from '@/app/shared/components/forms/input/input';
import { Card } from '@/app/shared/components/cards/card/card';
import { CardColumn } from '@/app/shared/components/cards/card-column/card-column';
import { NgOptimizedImage } from '@angular/common';
import { FakerService } from '@/app/core/fakers/faker-service';
import { Product } from '@/app/interfaces/product-interface';
import { CardRow } from '@/app/shared/components/cards/card-row/card-row';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import clsx from 'clsx';
import { RouterLink } from '@angular/router';

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
        NgOptimizedImage,
        CardRow,
        ReactiveFormsModule,
        RouterLink,
    ],
    templateUrl: './home.html',
    styleUrl: './home.css',
})
export class Home implements OnInit {
    homeService = inject(HomeService);
    fakerService = inject(FakerService);

    fb = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
    });

    get email() {
        return this.fb.get('email') as FormControl;
    }

    category = signal('');

    products = signal<Product[]>([]);

    getFeatures = computed(() => {
        return this.products()
            ?.filter((p) => p.category == this.category() || this.category() === '')
            .slice(0, 4);
    });

    getCategories = computed(() => {
        let pros = this.products();

        if (!pros) {
            return [];
        }

        return this.fakerService.getCategories(pros, 4);
    });

    topAttractions = computed(() => {
        return this.products().slice(0, 12);
    });

    popularTours = computed(() => {
        return this.products().slice(4, 12);
    });

    travelArticles = computed(() => {
        return this.products().slice(8, 8 + 12);
    });

    message = signal('');

    ngOnInit() {
        this.homeService.getFeatures().subscribe((products) => {
            this.products.set(products);
            this.category.set(products[0].category);
        });
    }

    protected sendEmail() {
        this.fb.markAllAsTouched();

        if (this.fb.invalid) {
            return;
        }

        this.message.set('Email sending successfully.');
    }

    protected readonly clsx = clsx;
}
