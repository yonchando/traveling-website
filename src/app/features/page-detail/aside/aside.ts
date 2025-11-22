import {
    Component,
    computed,
    input,
    signal,
    WritableSignal,
} from '@angular/core';
import dayjs from 'dayjs';
import { Feature } from '@/app/features/home/home-service';
import { Button } from '@/app/shared/components/button/button';
import { ReactiveFormsModule } from '@angular/forms';
import { Checkbox } from '@/app/shared/components/forms/checkbox/checkbox';

@Component({
    selector: 'app-aside',
    imports: [Button, ReactiveFormsModule, Checkbox],
    templateUrl: './aside.html',
    styleUrl: './aside.css',
})
export class Aside {
    feature = input<Feature | undefined>();

    protected readonly dayjs = dayjs;

    adult = signal(1);
    young = signal(0);
    children = signal(0);

    total = computed(() => {
        let extra = 0;

        return (
            this.adult() * 200 +
            this.young() * 150 +
            this.children() * 80 +
            extra
        );
    });

    addExtraOptionChecked = signal({
        service1: false,
        service2: false,
    });

    updateTicket(ticket: WritableSignal<number>, operator: '+' | '-') {
        ticket.update((value) =>
            operator === '+' ? value + 1 : Math.max(value - 1, 0),
        );
    }

    addExtra(e: Event, number: number) {
        const el = e.target as HTMLInputElement;

        if (el.checked) {
            if (number === 1) {
                this.addExtraOptionChecked().service1 = true;
            } else {
                this.addExtraOptionChecked().service1 = true;
            }
        } else {
            if (number === 1) {
                this.addExtraOptionChecked().service1 = false;
            } else {
                this.addExtraOptionChecked().service1 = false;
            }
        }
    }
}
