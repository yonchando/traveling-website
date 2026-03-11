import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '@/app/shared/services';

export const authGuard: CanActivateFn = () => {
    const authService = inject(AuthService);

    const user = sessionStorage.getItem('user');

    if (user) {
        authService.user.set(JSON.parse(user));
    }

    return true;
};
