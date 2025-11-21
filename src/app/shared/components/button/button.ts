import { Component, inject, input } from '@angular/core';
import clsx from 'clsx';
import { Router } from '@angular/router';

export type ButtonSeverity =
    | 'primary'
    | 'secondary'
    | 'warning'
    | 'default'
    | 'light'
    | 'outline';

@Component({
    selector: 'app-button',
    imports: [],
    templateUrl: './button.html',
    styleUrl: './button.css',
})
export class Button {
    router = inject(Router);

    severity = input<ButtonSeverity>('default');
    className = input<string>('');
    type = input<'button' | 'submit'>('button');
    disabled = input(false);

    link = input<string>('');

    protected classNames() {
        return clsx('btn', this.className(), {
            'btn-default': this.severity() === 'default',
            'btn-primary': this.severity() === 'primary',
            'btn-secondary': this.severity() === 'secondary',
            'btn-warning': this.severity() === 'warning',
            'btn-light': this.severity() === 'light',
            'btn-outline': this.severity() === 'outline',
        });
    }

    onClick = () => {
        if (this.link()) {
            this.router.navigateByUrl(this.link());
        }
    };
}
