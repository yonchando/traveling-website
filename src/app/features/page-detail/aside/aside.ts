import { Component, input, signal } from '@angular/core';
import dayjs from 'dayjs';
import { Feature } from '@/app/features/home/home-service';
import { Button } from '@/app/shared/components/button/button';
import { ReactiveFormsModule } from '@angular/forms';
import { Input } from '@/app/shared/components/forms/input/input';

@Component({
    selector: 'app-aside',
    imports: [Button, Input, ReactiveFormsModule],
    templateUrl: './aside.html',
    styleUrl: './aside.css',
})
export class Aside {
    feature = input<Feature | undefined>();
    protected readonly dayjs = dayjs;

    formTickets = signal({
        adult: 1,
        young: 1,
        chidlren: 1,
    });
}
