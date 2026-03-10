import { Component, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { IconEye } from '@/app/shared/components/svg/eye/eye';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-card-column',
    imports: [DecimalPipe, IconEye, RouterLink],
    templateUrl: './card-column.html',
    styleUrl: './card-column.css',
})
export class CardColumn {
    title = input('');
    count = input(0);
    imageUrl = input('');
}
