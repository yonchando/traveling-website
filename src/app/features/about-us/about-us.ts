import { Component } from '@angular/core';
import {Slider} from "@/app/shared/components/slider/slider";
import { Shade } from '@/app/shared/components/svg/shade/shade';

@Component({
    selector: 'app-about-us',
    imports: [Slider, Shade],
    templateUrl: './about-us.html',
    styleUrl: './about-us.css',
})
export class AboutUs {}
