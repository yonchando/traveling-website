import { Component, computed, input, model, signal } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import clsx from 'clsx';
import { IconChevronDown } from '@/app/shared/components/svg/chevron-down/chevron-down';
import { IconCheck } from '@/app/shared/components/svg/check/chevron-down';

type OptionLabel = string | ((option: any) => string);
type OptionValue = string | ((option: any) => string);

type Value = Record<string, any>;

export type SelectSeverity = 'primary' | 'warning';

@Component({
    selector: 'app-select',
    imports: [IconChevronDown, IconCheck],
    templateUrl: './select.html',
    styleUrl: './select.css',
})
export class Select implements ControlValueAccessor {
    readonly optionLabel = input<OptionLabel>('label');
    readonly optionValue = input<OptionValue>('value');
    readonly options = input.required<Value[]>();
    readonly placeholder = input(undefined);
    readonly severity = input<SelectSeverity>('primary');

    disabled = model<boolean>(false);

    value = signal<Value | undefined>(undefined);

    isOpen = signal(false);

    getSelected = computed(() => {
        const value = this.value();

        if (value) {
            return this.getLabel(value);
        }

        return this.placeholder() ?? 'Select option';
    });

    getButtonClass = computed(() => {
        return clsx(
            {},
            'relative h-12 w-full rounded-lg border border-secondary-100 bg-white px-4 text-left font-medium text-dark caret-warning',
        );
    });

    getDropdownClass = computed(() => {
        return clsx(
            {
                'h-0 overflow-hidden opacity-0': this.isOpen(),
            },
            'absolute top-full z-30 mt-2 flex w-full flex-col rounded-lg bg-white',
            'form-select-dropdown',
        );
    });

    onChange = () => {};
    onTouched = () => {};

    writeValue(obj: any): void {
        console.log(obj);
        this.value.set(obj);
    }
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
    setDisabledState?(isDisabled: boolean): void {
        this.disabled.set(isDisabled);
    }

    protected getValue(option: Value) {
        const optionValue = this.optionValue();

        if (typeof optionValue === 'function') {
            const key = optionValue(option);

            return option[key];
        }

        return option[optionValue];
    }

    protected getLabel(option: Value) {
        const optionLabel = this.optionLabel();

        if (typeof optionLabel === 'function') {
            const key = optionLabel(option);

            return option[key];
        }

        return option[optionLabel];
    }

    protected selection(value: any) {
        this.value.set(value);
    }

    open() {}
}
