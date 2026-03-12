import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '@/app/shared/services';

export const authRequiredGuard: CanActivateFn = () => {
    const user = sessionStorage.getItem('user');
    const router = inject(Router);
    const authService = inject(AuthService);

    if (!user) {
        return new RedirectCommand(router.parseUrl('/login'));
    }

    authService.user.set(JSON.parse(user));

    return true;
};
