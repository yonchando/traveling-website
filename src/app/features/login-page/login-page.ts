import { Component, inject, signal } from '@angular/core';
import { Slider } from '@/app/shared/components/slider/slider';
import { Input } from '@/app/shared/components/forms/input/input';
import { FormsModule } from '@angular/forms';
import { Button } from '@/app/shared/components/button/button';
import { Checkbox } from '@/app/shared/components/forms/checkbox/checkbox';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@/app/shared/services/auth-service';
import { HttpClient } from '@angular/common/http';
import { environment } from '@/environments/environment';

@Component({
    selector: 'app-login-page',
    imports: [Slider, Input, FormsModule, Button, Checkbox, RouterLink],
    templateUrl: './login-page.html',
    styleUrl: './login-page.css',
})
export class LoginPage {
    authService = inject(AuthService);
    router = inject(Router);
    http = inject(HttpClient);

    message = signal('');

    username = signal('');
    password = signal('');

    login() {
        this.authService.login(this.username()).subscribe({
            next: (user) => {
                if (user && user.password === this.password()) {
                    sessionStorage.setItem('user', JSON.stringify(user));

                    console.log(user);
                    this.authService.user.set(user);
                    this.router.navigate(['/']);
                } else {
                    this.message.set('Invalid username or password');
                    setTimeout(() => this.message.set(''), 3000);
                }
            },
        });
    }
}
