import { Component } from '@angular/core';
import { Button } from '@/app/shared/components/button/button';
import { HeroCard } from '@/app/shared/components/hero-card/hero-card';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Shade } from '@/app/shared/components/svg/shade/shade';

@Component({
    selector: 'app-promotion',
    imports: [Button, HeroCard, NgOptimizedImage, RouterLink, Shade],
    templateUrl: './promotion.html',
    styleUrl: './promotion.css',
})
export class Promotion {}
