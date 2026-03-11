import { Component, inject } from '@angular/core';
import { Button } from '@/app/shared/components/button/button';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Input } from '@/app/shared/components/forms/input/input';
import { RouterLink } from '@angular/router';
import { Slider } from '@/app/shared/components/slider/slider';
import { AuthService } from '@/app/shared/services';
import { User } from '@/app/interfaces/user-interface';

@Component({
    selector: 'app-register-page',
    imports: [Button, FormsModule, Input, RouterLink, Slider, ReactiveFormsModule],
    templateUrl: './register-page.html',
    styleUrl: './register-page.css',
})
export class RegisterPage {
    authService = inject(AuthService);

    registerForm: FormGroup = new FormGroup({
        name: new FormControl(null, [Validators.required]),
        username: new FormControl(null, [Validators.required]),
        password: new FormControl(null, [Validators.required]),
        passwordConfirmation: new FormControl(null, [Validators.required]),
    });

    get name() {
        return this.registerForm.controls['name'] as FormControl<string>;
    }
    get username() {
        return this.registerForm.controls['username'] as FormControl<string>;
    }
    get password() {
        return this.registerForm.controls['password'] as FormControl<string>;
    }
    get passwordConfirmation() {
        return this.registerForm.controls['passwordConfirmation'] as FormControl<string>;
    }

    protected isValid(control: AbstractControl) {
        return control.invalid && (control.touched || control.dirty);
    }

    register() {
        this.registerForm.markAllAsTouched();

        const password = this.password?.value ?? '';
        const passwordConfirmation = this.passwordConfirmation?.value ?? '';

        if (password !== passwordConfirmation) {
            this.passwordConfirmation.setErrors({
                not_matched: 'The password and confirmation must be matched.',
            });
        }

        if (this.registerForm.invalid) {
            return;
        }

        const user: Omit<User, 'id'> = {
            name: this.registerForm.controls['name'].value ?? '',
            username: this.registerForm.controls['username'].value ?? '',
            password: this.registerForm.controls['password'].value ?? '',
            avatar: '',
            email: '',
            gender: '',
            phone: '',
        };

        return this.authService
            .getUser({
                username: this.username.value,
            })
            .subscribe((existUser) => {
                if (existUser) {
                    this.username.setErrors({
                        exists: 'User already exists.',
                    });
                    return;
                }

                this.authService.register(user).subscribe({
                    next: () => {
                        window.history.back();
                    },
                });
            });
    }
}
