import { Component, inject, signal } from '@angular/core';
import { Shade } from '@/app/shared/components/svg/shade/shade';
import { FormsModule } from '@angular/forms';
import { Input } from '@/app/shared/components/forms/input/input';
import { Button } from '@/app/shared/components/button/button';
import { AppStore } from '@/app/shared/components/svg/app-store/app-store';
import { GooglePlay } from '@/app/shared/components/svg/google-play/google-play';
import { RouterLink } from '@angular/router';
import { ApiService } from '@/app/shared/services';
import { IconSend } from '@/app/shared/components/svg/send/send';

@Component({
    selector: 'app-footer',
    imports: [Shade, FormsModule, Input, Button, AppStore, GooglePlay, RouterLink, IconSend],
    templateUrl: './footer.html',
    styleUrl: './footer.css',
})
export class Footer {
    isSubscribed = signal(false);
    email = signal('');
    error = signal('');
    message = signal('');

    api = inject(ApiService);

    subscribe() {
        if (this.email() === '') {
            this.error.set('Please enter your email address');
            return;
        }

        if (this.email().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) === null) {
            this.error.set('Please enter valid email address');
            return;
        }

        this.error.set('');
        this.email.set('');
        this.isSubscribed.set(true);

        this.api.subscription(this.email()).subscribe(() => {
            this.isSubscribed.set(false);
            this.message.set("Thanks for subscription");
        });
    }
}
