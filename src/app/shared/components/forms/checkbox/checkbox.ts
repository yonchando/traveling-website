import { booleanAttribute, Component, ElementRef, forwardRef, input, output, signal, viewChild } from "@angular/core";
import { CheckboxControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { clsx } from "clsx";

@Component({
    selector: "app-checkbox",
    imports: [],
    templateUrl: "./checkbox.html",
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => Checkbox),
            multi: true,
        },
    ],
    host: {
        "[class]": "clsx('flex items-center gap-2')",
    },
})
export class Checkbox extends CheckboxControlValueAccessor {
    readonly id = input("");
    readonly label = input("");

    disabled = signal(false);
    required = input(false, {
        transform: booleanAttribute,
    });

    value = input<any>(null);
    isChecked = signal(false);

    formControl = signal<any>(null);

    override writeValue(value: any) {
        this.isChecked.set(value === this.value() || !!value);
        this.formControl.set(value);
    }

    override setDisabledState(isDisabled: boolean) {
        this.disabled.set(isDisabled);
    }

    protected onBlur() {
        this.onTouched();
    }

    protected onInput(e: Event) {
        const el = e.target as HTMLInputElement;
        this.onChange(el.value);
    }

    protected readonly clsx = clsx;

    protected onClickPlaceholder() {
        if (this.isChecked()) {
            //unchecked
            this.isChecked.set(false);
            this.onChange(undefined);
        } else {
            // checked
            this.isChecked.set(true);
            this.setValue();
        }
    }

    protected setValue() {
        if (this.value()) {
            this.onChange(this.value());
        } else {
            this.onChange(this.isChecked());
        }

        this.onTouched();
    }
}
