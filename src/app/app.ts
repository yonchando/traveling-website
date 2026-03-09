import { AfterViewInit, Component, ElementRef, OnInit, signal, TemplateRef, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '@/app/shared/components/layouts/header/header';
import { Footer } from '@/app/shared/components/layouts/footer/footer';
import { Button } from '@/app/shared/components/button/button';
import { IconArrowUp } from '@/app/shared/components/svg/arrow-up/arrow-up';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, Header, Footer, Button, IconArrowUp],
    templateUrl: './app.html',
    styleUrl: './app.css',
    host: {
        '(window:scroll)': 'onScroll()',
    },
})
export class App implements AfterViewInit {
    protected readonly title = signal('sv40-travel');

    scrollUp = viewChild.required<ElementRef<HTMLDivElement>>('scrollUp');

    ngAfterViewInit() {
        this.scrollUp()?.nativeElement.classList.add('opacity-0', 'h-0', 'overflow-hidden');
    }

    onScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;

        const halfPagePoint = (scrollHeight * 20) / 100;

        const scroll = this.scrollUp()?.nativeElement;

        if (scrollTop > halfPagePoint) {
            scroll.classList.remove('opacity-0', 'h-0');
            scroll?.classList.add('opacity-100');
        } else {
            scroll.classList.add('opacity-0');
            scroll.classList.remove('opacity-100');
        }
    }

    protected scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }
}
