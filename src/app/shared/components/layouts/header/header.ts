import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

type MenuItem = {
    label: string;
    link: string;
    active?: boolean;
};

@Component({
    selector: 'app-header',
    imports: [RouterLink, RouterLinkActive],
    templateUrl: './header.html',
    styleUrl: './header.css',
})
export class Header {
    menuItems: MenuItem[] = [
        {
            label: 'Explore ',
            link: '/page-list',
        },
        {
            label: 'Contact us',
            link: '/contact-us',
        },
        {
            label: 'About us',
            link: '/about-us',
        },
        {
            label: 'Sign up',
            link: '/sign-up',
        },
        {
            label: 'Log in',
            link: '/login',
            active: true,
        },
    ];
}
