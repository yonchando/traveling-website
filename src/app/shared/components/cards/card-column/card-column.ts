import { Component, input } from '@angular/core';

@Component({
    selector: 'app-card-column',
    imports: [],
    templateUrl: './card-column.html',
    styleUrl: './card-column.css',
})
export class CardColumn {
    title = input('');
    count = input('');
    imageUrl = input('');
}
