import { Component } from '@angular/core';
import {Slider} from "@/app/shared/components/slider/slider";
import { Shade } from '@/app/shared/components/svg/shade/shade';
import { NgOptimizedImage } from '@angular/common';

@Component({
    selector: 'app-about-us',
    imports: [Slider, Shade, NgOptimizedImage],
    templateUrl: './about-us.html',
    styleUrl: './about-us.css',
})
export class AboutUs {}
