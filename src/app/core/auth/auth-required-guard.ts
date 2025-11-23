import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authRequiredGuard: CanActivateFn = () => {
    const username = sessionStorage.getItem('username');
    const router = inject(Router);

    if (!username) {
        return new RedirectCommand(router.parseUrl('/login'));
    }

    return true;
};
