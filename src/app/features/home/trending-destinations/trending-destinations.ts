import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Thumbnail } from '@/app/shared/components/thumbnail/thumbnail';
import { ApiService } from '@/app/shared/services';
import { Product } from '@/app/interfaces/product-interface';

@Component({
    selector: 'app-trending-destinations',
    imports: [RouterLink, Thumbnail],
    templateUrl: './trending-destinations.html',
    styleUrl: './trending-destinations.css',
})
export class TrendingDestinations implements OnInit {
    apiService = inject(ApiService);

    products = signal<Product[]>([]);

    ngOnInit(): void {
        this.apiService.getProducts(0, 4).subscribe((res) => {
            this.products.set(res.data);
        });
    }
}
