import { Injectable } from '@angular/core';
import { User } from '@/app/interfaces/user-interface';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    user: User | null = null;
}
