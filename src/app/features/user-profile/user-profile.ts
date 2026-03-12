import { Component, computed, inject } from '@angular/core';
import { Slider } from '@/app/shared/components/slider/slider';
import { UserInfo } from '@/app/features/user-profile/user-info/user-info';
import { UserNav } from '@/app/features/user-profile/user-nav/user-nav';
import { AuthService } from '@/app/shared/services';

@Component({
    selector: 'app-user-profile',
    imports: [Slider, UserInfo, UserNav],
    templateUrl: './user-profile.html',
    styleUrl: './user-profile.css',
})
export class UserProfile {
    authService = inject(AuthService);

    user = computed(() => {
        return this.authService.user();
    });
}
