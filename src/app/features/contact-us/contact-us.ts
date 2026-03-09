import { Component, inject, OnInit, signal } from '@angular/core';
import { Slider } from '@/app/shared/components/slider/slider';
import { Input } from '@/app/shared/components/forms/input/input';
import { faker } from '@faker-js/faker/locale/en';
import { Button } from '@/app/shared/components/button/button';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

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
    imports: [Slider, Input, Button, ReactiveFormsModule],
    templateUrl: './contact-us.html',
    styleUrl: './contact-us.css',
})
export class ContactUs implements OnInit {
    companyInfo = signal<CompanyInfo | null>(null);
    locations = signal<LocationInfo[]>([]);

    openIndex = signal(0);

    fb = inject(FormBuilder);

    form = this.fb.group({
        name: [null, [Validators.required]],
        email: [null, [Validators.required, Validators.email]],
        title: [null, [Validators.required, Validators.maxLength(255)]],
        description: [null, [Validators.required]],
    });

    get name() {
        return this.form.controls.name;
    }
    get email() {
        return this.form.controls.email;
    }
    get title() {
        return this.form.controls.title;
    }
    get description() {
        return this.form.controls.description;
    }

    message = signal('');

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
                address: `No ${faker.location.buildingNumber()} St. ${faker.location.street()}, ${faker.location.country()} ${faker.location.zipCode()}`,
                phone: '+1 234 567 890',
            },
        ]);

        for (let i = 0; i < 4; i++) {
            this.locations().push({
                location: faker.location.city(),
                address: `No ${faker.location.buildingNumber()} St. ${faker.location.street()}, ${faker.location.country()} ${faker.location.zipCode()}`,
                phone: faker.phone.number({
                    style: 'international',
                }),
            });
        }
    }

    protected sendEmail() {
        this.form.markAllAsTouched();

        if (this.form.invalid) {
            console.log(this.form.get('email')?.errors);
            return;
        }

        this.message.set(
            'Thank you for contacting us. Our team will review your message and get back to you within 24–48 hours one business day.',
        );

        this.form.reset();

        setTimeout(() => {
            this.message.set('');
        }, 5000);
    }
}
