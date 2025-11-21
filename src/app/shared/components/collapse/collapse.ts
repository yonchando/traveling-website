import {
    booleanAttribute,
    Component,
    computed,
    input,
    signal,
    TemplateRef,
} from '@angular/core';
import { Button } from '@/app/shared/components/button/button';
import { NgTemplateOutlet } from '@angular/common';
import clsx from 'clsx';

@Component({
    selector: 'app-collapse',
    imports: [Button, NgTemplateOutlet],
    templateUrl: './collapse.html',
    styleUrl: './collapse.css',
})
export class Collapse {
    label = input();

    btnRef = input<TemplateRef<any>>();
    
    isCollapsed = signal(true);

    toggleContent = () => {
        this.isCollapsed.update((value) => !value);
    };

    getClasses = computed(() => {
        return clsx({
            hidden: this.isCollapsed(),
            block: !this.isCollapsed(),
        });
    });
}
