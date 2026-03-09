import { inject, Injectable, signal } from '@angular/core';
import { of } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { Product } from '@/app/interfaces/product-interface';
import { FakerService } from '@/app/core/fakers/faker-service';

export interface Feature {
    id: number;
    title: string;
    content?: string;
    price: number;
    originalPrice?: string;
    duration: string;
    tag: string;
    imageUrl: string;
    category: string;
    date?: string;
    author?: string;
    rating?: number;
    reviewCount?: number;
}

@Injectable({
    providedIn: 'root',
})
export class HomeService {
    username = signal('');
    fakerService = inject(FakerService);

    getFeatures() {
        return this.fakerService.getProducts();
    }
}
