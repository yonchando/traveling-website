import { Component, computed, signal } from '@angular/core';
import { Button } from '@/app/shared/components/button/button';
import { Checkbox } from '@/app/shared/components/forms/checkbox/checkbox';
import { Collapse } from '@/app/shared/components/collapse/collapse';
import { Input } from '@/app/shared/components/forms/input/input';
import dayjs from 'dayjs';

@Component({
    selector: 'app-aside',
    imports: [Button, Checkbox, Collapse, Input],
    templateUrl: './aside.html',
    styleUrl: './aside.css',
})
export class Aside {
    fromDate = signal(dayjs().format('MMMM DD'));
    toDate = signal(dayjs().add(7, 'day').format('MMMM DD'));

    date = computed(() => `${this.fromDate()} ~ ${this.toDate()}`);
}
