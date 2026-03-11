import { inject, Injectable, signal } from '@angular/core';
import { User } from '@/app/interfaces/user-interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@/environments/environment';
import { map, tap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    user = signal<User | null>(null);

    private http = inject(HttpClient);

    getUser(params?: Record<string, any>) {
        return this.http
            .get<User[]>(`${environment.apiUrl}/users`, {
                params: params,
            })
            .pipe(
                map((users) => {
                    if (users && users.length > 0) {
                        return users[0];
                    }

                    return null;
                }),
            );
    }

    register(user: Omit<User, 'id'>) {
        return this.http.post<User>(`${environment.apiUrl}/users`, user).pipe(
            tap((user) => {
                this.user.set(user);
                sessionStorage.setItem('user', JSON.stringify(user));
            }),
        );
    }

    login(username: string) {
        return this.getUser({
            username,
        });
    }
}
