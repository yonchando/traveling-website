import { Component, computed, inject, signal } from '@angular/core';
import { Slider } from '@/app/shared/components/slider/slider';
import { UserInfo } from '@/app/features/user-profile/user-info/user-info';
import { UserNav } from '@/app/features/user-profile/user-nav/user-nav';
import { Input } from '@/app/shared/components/forms/input/input';
import { Button } from '@/app/shared/components/button/button';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '@/app/shared/services';
import { environment } from '@/environments/environment';

@Component({
    selector: 'app-user-change-password',
    imports: [Slider, UserInfo, UserNav, Input, Button, FormsModule, ReactiveFormsModule],
    templateUrl: './user-change-password.html',
    styleUrl: './user-change-password.css',
})
export class UserChangePassword {
    authService = inject(AuthService);

    http = inject(HttpClient);

    message = signal('');

    user = computed(() => {
        return this.authService.user();
    });

    form = new FormGroup({
        currentPassword: new FormControl(null, [Validators.required]),
        password: new FormControl(null, [Validators.required]),
        passwordConfirmation: new FormControl(null, [Validators.required]),
    });

    get currentPassword() {
        return this.form.controls['currentPassword'];
    }
    get password() {
        return this.form.controls['password'];
    }
    get passwordConfirmation() {
        return this.form.controls['passwordConfirmation'];
    }

    updatePassword() {
        this.form.markAllAsTouched();

        if (this.currentPassword.value !== this.user()?.password) {
            this.currentPassword.setErrors({
                invalid: 'Current password is incorrect.',
            });
        }

        if (this.passwordConfirmation.value !== this.password.value) {
            this.passwordConfirmation.setErrors({
                invalid: 'The password and confirmation must be matched.',
            });
        }

        if (this.form.invalid) {
            return;
        }

        this.http
            .put(`${environment.apiUrl}/users/${this.user()?.id}`, {
                ...this.user(),
                password: this.password.value,
            })
            .subscribe({
                next: () => {
                    this.form.reset();
                    this.message.set('Password updated successfully.');
                    setTimeout(() => this.message.set(''), 3000);
                },
            });
    }

    isInvalid(formControl: FormControl) {
        return formControl.invalid && (formControl.dirty || formControl.touched);
    }
}
