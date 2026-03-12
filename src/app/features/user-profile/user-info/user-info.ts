import { Component, inject, input, OnInit, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { User } from '@/app/interfaces/user-interface';
import { Button } from '@/app/shared/components/button/button';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Input } from '@/app/shared/components/forms/input/input';
import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Select } from '@/app/shared/components/forms/select/select';
import { AuthService } from '@/app/shared/services';

@Component({
    selector: 'app-user-info',
    imports: [NgOptimizedImage, Button, FormsModule, Input, ReactiveFormsModule, Select],
    templateUrl: './user-info.html',
    styleUrl: './user-info.css',
})
export class UserInfo implements OnInit {
    http = inject(HttpClient);

    authService = inject(AuthService);

    user = input.required<User | null>();

    isEdit = signal(false);

    message = signal('');

    form = new FormGroup<any>({
        name: new FormControl(null, [Validators.required]),
        phone: new FormControl(null, [Validators.required]),
        email: new FormControl(null, [Validators.required, Validators.email]),
    });

    get name() {
        return this.form.controls['name'] as FormControl;
    }
    get phone() {
        return this.form.controls['phone'] as FormControl;
    }
    get email() {
        return this.form.controls['email'] as FormControl;
    }
    ngOnInit() {
        this.form.patchValue({
            name: this.user()?.name ?? '',
            phone: this.user()?.phone ?? '',
            email: this.user()?.email ?? '',
        });
    }

    update() {
        this.form.markAllAsTouched();

        if (this.form.invalid) {
            return;
        }

        const data = {
            ...this.user(),
            ...this.form.value,
        };

        sessionStorage.setItem('user', JSON.stringify(data));
        this.authService.user.set(data);

        this.http.put(`${environment.apiUrl}/users/${this.user()?.id}`, data).subscribe({
            next: () => {
                this.form.reset();
                this.message.set('Password updated successfully.');
                setTimeout(() => this.message.set(''), 3000);
                this.cancel();
            },
        });
    }

    edit() {
        this.isEdit.set(true);
    }

    cancel() {
        this.isEdit.set(false);
    }

    isInvalid(formControl: FormControl) {
        return formControl.invalid && (formControl.dirty || formControl.touched);
    }
}
