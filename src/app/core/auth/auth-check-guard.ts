import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { ApiService } from '@/app/shared/services/api-service';

export const authCheckGuard: CanActivateFn = () => {
    const username = sessionStorage.getItem('username');

    const productService = inject(ApiService);

    productService.username.set(username ?? '');

    return true;
};
