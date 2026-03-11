import { Component, computed, inject, signal } from '@angular/core';
import { Button } from '@/app/shared/components/button/button';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeroCard } from '@/app/shared/components/hero-card/hero-card';
import { Input } from '@/app/shared/components/forms/input/input';
import { NgOptimizedImage } from '@angular/common';
import clsx from 'clsx';
import { Category } from '@/app/interfaces/category-interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '@/environments/environment';
import { ApiService } from '@/app/shared/services';
import { IconSend } from '@/app/shared/components/svg/send/send';

@Component({
    selector: 'app-subscription',
    imports: [Button, FormsModule, HeroCard, Input, NgOptimizedImage, ReactiveFormsModule, IconSend],
    templateUrl: './subscription.html',
    styleUrl: './subscription.css',
})
export class Subscription {
    api = inject(ApiService);

    get email() {
        return this.fb.get('email') as FormControl;
    }

    fb = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
    });

    message = signal('');

    inputClass = computed(() => {
        return clsx({
            invalid: this.email.invalid && (this.email.dirty || this.email.touched),
        });
    });

    protected sendEmail() {
        this.fb.markAllAsTouched();

        if (this.fb.invalid) {
            return;
        }

        this.api.subscription(this.email.value).subscribe(() => {
            this.message.set(`Thanks for subscription`);
            setTimeout(() => this.message.set(''), 3000);
        });
    }
}
