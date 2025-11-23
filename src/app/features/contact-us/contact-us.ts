import { Component, OnInit, signal } from '@angular/core';
import { Slider } from '@/app/shared/components/slider/slider';
import { Input } from '@/app/shared/components/forms/input/input';
import { faker } from '@faker-js/faker/locale/en';
import { Button } from '@/app/shared/components/button/button';

type LocationInfo = {
    location: string;
    address: string;
    phone: string;
};

type CompanyInfo = {
    name: string;
    email: string;
    phone: string;
};

@Component({
    selector: 'app-contact-us',
    imports: [Slider, Input, Button],
    templateUrl: './contact-us.html',
    styleUrl: './contact-us.css',
})
export class ContactUs implements OnInit {
    companyInfo = signal<CompanyInfo | null>(null);
    locations = signal<LocationInfo[]>([]);

    openIndex = signal(0);

    ngOnInit() {
        this.companyInfo.set({
            name: faker.company.name(),
            email: faker.internet.email(),
            phone: faker.phone.number({
                style: 'international',
            }),
        });

        this.locations.set([
            {
                location: 'Headquarters',
                address: '123 Main Street, Anytown, USA',
                phone: '+1 234 567 890',
            },
        ]);

        for (let i = 0; i < 4; i++) {
            this.locations().push({
                location: faker.location.city(),
                address: faker.location.streetAddress(),
                phone: faker.phone.number({
                    style: 'international',
                }),
            });
        }
    }
}
