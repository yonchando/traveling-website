import { Component, computed, inject, signal } from '@angular/core';
import { Slider } from '@/app/shared/components/slider/slider';
import { faker } from '@faker-js/faker/locale/en';
import { User } from '@/app/interfaces/user-interface';
import { NgOptimizedImage } from '@angular/common';
import { AuthService } from '@/app/shared/services';

@Component({
    selector: 'app-user-profile',
    imports: [Slider, NgOptimizedImage],
    templateUrl: './user-profile.html',
    styleUrl: './user-profile.css',
})
export class UserProfile {
    user = computed(() => {
        const user = sessionStorage.getItem('user');

        return user ? JSON.parse(user) : null;
    });
}
