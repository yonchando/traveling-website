import { Component, inject, signal } from '@angular/core';
import { Slider } from '@/app/shared/components/slider/slider';
import { Input } from '@/app/shared/components/forms/input/input';
import { FormsModule } from '@angular/forms';
import { Button } from '@/app/shared/components/button/button';
import { Checkbox } from '@/app/shared/components/forms/checkbox/checkbox';
import { Router, RouterLink } from '@angular/router';
import { HomeService } from '@/app/features/home/home-service';

@Component({
    selector: 'app-login-page',
    imports: [Slider, Input, FormsModule, Button, Checkbox, RouterLink],
    templateUrl: './login-page.html',
    styleUrl: './login-page.css',
})
export class LoginPage {
    homeService = inject(HomeService);
    router = inject(Router);

    username = signal('');
    password = signal('');

    async login() {
        sessionStorage.setItem('username', this.username());

        this.homeService.username.set(this.username());

        await this.router.navigate(['/profile']);
    }
}
