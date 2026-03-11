import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'stringlength',
})
export class StringLengthPipe implements PipeTransform {
    transform(value: string, length: number = 50): unknown {
        if (!value || value === '') return '';

        let string = value.slice(0, length);

        if (string.length < length) {
            string += '...';
        }

        return string;
    }
}
