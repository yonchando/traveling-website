import { inject, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
    name: 'safeHtml',
})
export class SafeHtmlPipe implements PipeTransform {
    domSanitizer = inject(DomSanitizer);
    transform(value: unknown, ...args: unknown[]): unknown {
        return this.domSanitizer.bypassSecurityTrustHtml(value as string);
    }
}
