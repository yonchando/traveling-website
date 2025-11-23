import { Component, OnInit, signal } from '@angular/core';
import { Slider } from '@/app/shared/components/slider/slider';
import { faker } from '@faker-js/faker/locale/en';

@Component({
    selector: 'app-data-policy',
    imports: [Slider],
    templateUrl: './data-policy.html',
    styles: ``,
})
export class DataPolicy implements OnInit {
    content = signal('');

    ngOnInit(): void {
        this.content.set(faker.lorem.paragraphs(100));
    }
}
