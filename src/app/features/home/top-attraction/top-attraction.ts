import { Component, inject, OnInit, signal } from '@angular/core';
import { Button } from '@/app/shared/components/button/button';
import { CardColumn } from '@/app/shared/components/cards/card-column/card-column';
import { RouterLink } from '@angular/router';
import { Product } from '@/app/interfaces/product-interface';
import { ApiService } from '@/app/shared/services';

@Component({
    selector: 'app-top-attraction',
    imports: [Button, CardColumn, RouterLink],
    templateUrl: './top-attraction.html',
    styleUrl: './top-attraction.css',
})
export class TopAttraction implements OnInit {
    topAttractions = signal<Product[]>([]);

    api = inject(ApiService);

    ngOnInit() {
        this.api.getProducts(0, 12).subscribe((res) => {
            this.topAttractions.set(res.data);
        });
    }
}
