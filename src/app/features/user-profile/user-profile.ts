import { Component, signal } from '@angular/core';
import { Slider } from '@/app/shared/components/slider/slider';
import { faker } from '@faker-js/faker/locale/en';
import { User } from '@/app/interfaces/user-interface';
import { NgOptimizedImage } from '@angular/common';

@Component({
    selector: 'app-user-profile',
    imports: [Slider, NgOptimizedImage],
    templateUrl: './user-profile.html',
    styleUrl: './user-profile.css',
})
export class UserProfile {
    user = signal<User | null>(null);

    constructor() {
        this.user.set({
            id: 0,
            password: '',
            gender: '',
            name: faker.person.fullName(),
            username: faker.person.fullName(),
            email: faker.internet.email(),
            avatar: faker.image.avatar(),
            phone: '',
        });
    }
}
