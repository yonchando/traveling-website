import { Component, signal } from '@angular/core';
import { Button } from '@/app/shared/components/button/button';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeroCard } from '@/app/shared/components/hero-card/hero-card';
import { Input } from '@/app/shared/components/forms/input/input';
import { NgOptimizedImage } from '@angular/common';
import clsx from 'clsx';
import { Category } from '@/app/interfaces/category-interface';

@Component({
    selector: 'app-subscription',
    imports: [Button, FormsModule, HeroCard, Input, NgOptimizedImage, ReactiveFormsModule],
    templateUrl: './subscription.html',
    styleUrl: './subscription.css',
})
export class Subscription {
    protected readonly clsx = clsx;

    get email() {
        return this.fb.get('email') as FormControl;
    }

    fb = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
    });

    message = signal('');

    protected sendEmail() {
        this.fb.markAllAsTouched();

        if (this.fb.invalid) {
            return;
        }

        this.message.set('Email sending successfully.');
    }
}
