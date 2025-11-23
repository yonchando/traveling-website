import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Slider } from '@/app/shared/components/slider/slider';
import { HomeService } from '@/app/features/home/home-service';
import { faker } from '@faker-js/faker/locale/en';

type User = {
    name: string;
    email: string;
    phone: string;
    profilePicture: string;
};

@Component({
    selector: 'app-user-profile',
    imports: [Slider],
    templateUrl: './user-profile.html',
    styleUrl: './user-profile.css',
})
export class UserProfile {
    homeService = inject(HomeService);

    username = computed(() => this.homeService.username());

    user = signal<User | null>(null);

    constructor() {
        this.user.set({
            name: faker.person.fullName(),
            email: faker.internet.email(),
            phone: faker.phone.number({
                style: 'human',
            }),
            profilePicture: faker.image.avatar(),
        });
    }
}
