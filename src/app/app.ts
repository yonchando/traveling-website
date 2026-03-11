import { AfterViewInit, Component, ElementRef, inject, OnInit, signal, TemplateRef, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '@/app/shared/components/layouts/header/header';
import { Footer } from '@/app/shared/components/layouts/footer/footer';
import { Button } from '@/app/shared/components/button/button';
import { IconArrowUp } from '@/app/shared/components/svg/arrow-up/arrow-up';
import { User } from '@/app/interfaces/user-interface';
import { faker } from '@faker-js/faker/locale/en';
import { fa, fakerKA_GE } from '@faker-js/faker';
import { FakerService } from '@/app/core/fakers/faker-service';
import { range } from '@/app/shared/ultils/iterator-util';
import { Country } from '@/app/interfaces/location-interface';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, Header, Footer, Button, IconArrowUp],
    templateUrl: './app.html',
    styleUrl: './app.css',
    host: {
        '(window:scroll)': 'onScroll()',
    },
})
export class App implements OnInit, AfterViewInit {
    protected readonly title = signal('sv40-travel');

    protected readonly faker = inject(FakerService);

    scrollUp = viewChild.required<ElementRef<HTMLDivElement>>('scrollUp');

    ngOnInit() {
    }

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
