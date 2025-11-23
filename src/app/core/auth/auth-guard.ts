import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { HomeService } from '@/app/features/home/home-service';

export const authGuard: CanActivateFn = () => {
    const username = sessionStorage.getItem('username');

    const homeService = inject(HomeService);

    homeService.username.set(username ?? '');

    return true;
};
