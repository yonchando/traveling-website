import { booleanAttribute, Component, computed, forwardRef, input, model, output, signal } from '@angular/core';
import { ControlValueAccessor, DefaultValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
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
export class Input implements ControlValueAccessor {
    type = input('text');
    id = input('');
    className = input('');
    placeholder = input('');
    name = input('');
    readonly = input(false, { transform: booleanAttribute });
    disabled = model<boolean>(false);
    value = model('');
    getClassName = computed(() => clsx('form-input', this.className()));

    typing = output<{
        e: Event;
        value: string;
    }>();

    onChange = (value: string) => {};
    onTouched = () => {};

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
    setDisabledState?(isDisabled: boolean): void {
        this.disabled.set(isDisabled);
    }

    writeValue(value: string): void {
        this.value.set(value);
    }

    onInput(event: Event) {
        let value = (event.target as HTMLInputElement).value;
        this.value.set(value);
        this.onChange(value);

        this.typing.emit({
            e: event,
            value: value,
        });
    }
}
