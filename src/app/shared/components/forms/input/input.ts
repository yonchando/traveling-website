import {
    Component,
    computed,
    forwardRef,
    input,
    model,
    signal,
} from '@angular/core';
import { DefaultValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import clsx from 'clsx';

@Component({
    selector: 'app-input',
    imports: [],
    templateUrl: './input.html',
    styleUrl: './input.css',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => Input),
            multi: true,
        },
    ],
})
export class Input extends DefaultValueAccessor {
    type = input('text');
    id = input('');
    className = input('');
    placeholder = input('');
    name = input('');
    value = model('');
    getClassName = computed(() => clsx('form-input', this.className()));

    override writeValue(value: string): void {
        this.value.set(value);
    }

    onInput(event: Event) {
        let value = (event.target as HTMLInputElement).value;
        this.value.set(value);
        this.onChange(value);
    }
}
