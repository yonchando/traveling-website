import { Component, computed, effect, ElementRef, inject, signal, viewChild } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { SafeHtmlPipe } from '@/app/shared/pipes/safe-html-pipe';
import { Button } from '@/app/shared/components/button/button';
import { HomeService } from '@/app/features/home/home-service';

type MenuItem = {
    label: string;
    link: string;
    active?: boolean;
    icon?: any;
    hide?: boolean;
};

@Component({
    selector: 'app-header',
    imports: [RouterLink, RouterLinkActive, SafeHtmlPipe, Button],
    templateUrl: './header.html',
    styleUrl: './header.css',
})
export class Header {
    homeService = inject(HomeService);
    router = inject(Router);

    mobileMenuOpen = signal(false);
    profileDropdown = signal(false);

    dropDownMenu = viewChild('dropdown', { read: ElementRef<HTMLDivElement> });

    menuItems = computed<MenuItem[]>(() => {
        return [
            {
                label: 'Explore ',
                link: '/page-list',
                icon: `<svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M11.9552 24C10.3014 24 8.7472 23.6848 7.29265 23.0544C5.83811 22.4248 4.57285 21.57 3.49689 20.49C2.42092 19.41 1.56932 18.14 0.942067 16.68C0.314023 15.22 0 13.66 0 12C0 10.34 0.314023 8.78 0.942067 7.32C1.56932 5.86 2.42092 4.59 3.49689 3.51C4.57285 2.43 5.83811 1.5748 7.29265 0.9444C8.7472 0.3148 10.3014 0 11.9552 0C14.8643 0 17.4095 0.9148 19.5909 2.7444C21.7731 4.5748 23.1332 6.87 23.6712 9.63H21.2204C20.8418 8.17 20.1596 6.8648 19.1737 5.7144C18.187 4.5648 16.9763 3.7 15.5417 3.12V3.6C15.5417 4.26 15.3078 4.8248 14.84 5.2944C14.3713 5.7648 13.8082 6 13.1507 6H10.7597V8.4C10.7597 8.74 10.6453 9.0248 10.4165 9.2544C10.187 9.4848 9.90286 9.6 9.56413 9.6H7.1731V12H9.56413V15.6H8.36862L2.63014 9.84C2.57036 10.2 2.51537 10.56 2.46516 10.92C2.41574 11.28 2.39103 11.64 2.39103 12C2.39103 14.62 3.3076 16.87 5.14072 18.75C6.97385 20.63 9.24533 21.58 11.9552 21.6V24ZM21.9975 22.56L19.0087 19.56C18.5903 19.8 18.142 20 17.6638 20.16C17.1856 20.32 16.6775 20.4 16.1395 20.4C14.6451 20.4 13.3746 19.8752 12.3282 18.8256C11.2825 17.7752 10.7597 16.5 10.7597 15C10.7597 13.5 11.2825 12.2248 12.3282 11.1744C13.3746 10.1248 14.6451 9.6 16.1395 9.6C17.6339 9.6 18.9043 10.1248 19.9508 11.1744C20.9965 12.2248 21.5193 13.5 21.5193 15C21.5193 15.54 21.4396 16.05 21.2802 16.53C21.1208 17.01 20.9215 17.46 20.6824 17.88L23.6712 20.88C23.8904 21.1 24 21.38 24 21.72C24 22.06 23.8904 22.34 23.6712 22.56C23.4521 22.78 23.1731 22.89 22.8344 22.89C22.4956 22.89 22.2167 22.78 21.9975 22.56ZM16.1395 18C16.9763 18 17.6837 17.71 18.2615 17.13C18.8394 16.55 19.1283 15.84 19.1283 15C19.1283 14.16 18.8394 13.45 18.2615 12.87C17.6837 12.29 16.9763 12 16.1395 12C15.3026 12 14.5953 12.29 14.0174 12.87C13.4396 13.45 13.1507 14.16 13.1507 15C13.1507 15.84 13.4396 16.55 14.0174 17.13C14.5953 17.71 15.3026 18 16.1395 18Z"
                            fill="currentColor"
                        />
                    </svg>`,
            },
            {
                label: 'Contact us',
                link: '/contact-us',
                icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 0C5.376 0 0 5.376 0 12C0 18.624 5.376 24 12 24C18.624 24 24 18.624 24 12C24 5.376 18.624 0 12 0ZM13.2 18H10.8V10.8H13.2V18ZM13.2 8.4H10.8V6H13.2V8.4Z" fill="currentColor"/>
                    </svg>
            `,
            },
            {
                label: 'About us',
                link: '/about-us',
                icon: `<svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M7.5 11.5C6.53333 11.5 5.70833 11.1583 5.025 10.475C4.34167 9.79167 4 8.96667 4 8C4 7.03333 4.34167 6.20833 5.025 5.525C5.70833 4.84167 6.53333 4.5 7.5 4.5C8.46667 4.5 9.29167 4.84167 9.975 5.525C10.6583 6.20833 11 7.03333 11 8C11 8.96667 10.6583 9.79167 9.975 10.475C9.29167 11.1583 8.46667 11.5 7.5 11.5ZM7.5 9.5C7.91667 9.5 8.27067 9.354 8.562 9.062C8.854 8.77067 9 8.41667 9 8C9 7.58333 8.854 7.22933 8.562 6.938C8.27067 6.646 7.91667 6.5 7.5 6.5C7.08333 6.5 6.72933 6.646 6.438 6.938C6.146 7.22933 6 7.58333 6 8C6 8.41667 6.146 8.77067 6.438 9.062C6.72933 9.354 7.08333 9.5 7.5 9.5ZM14.5 12.5C13.8 12.5 13.2083 12.2583 12.725 11.775C12.2417 11.2917 12 10.7 12 10C12 9.3 12.2417 8.70833 12.725 8.225C13.2083 7.74167 13.8 7.5 14.5 7.5C15.2 7.5 15.7917 7.74167 16.275 8.225C16.7583 8.70833 17 9.3 17 10C17 10.7 16.7583 11.2917 16.275 11.775C15.7917 12.2583 15.2 12.5 14.5 12.5ZM8.3 17.8C9.05 16.2833 10.05 15.2707 11.3 14.762C12.55 14.254 13.6167 14 14.5 14C14.8833 14 15.2583 14.0333 15.625 14.1C15.9917 14.1667 16.35 14.25 16.7 14.35C17.1 13.7167 17.4167 13.0333 17.65 12.3C17.8833 11.5667 18 10.8 18 10C18 7.76667 17.225 5.875 15.675 4.325C14.125 2.775 12.2333 2 10 2C7.76667 2 5.875 2.775 4.325 4.325C2.775 5.875 2 7.76667 2 10C2 10.75 2.09567 11.4667 2.287 12.15C2.479 12.8333 2.76667 13.4667 3.15 14.05C3.8 13.7167 4.48767 13.4583 5.213 13.275C5.93767 13.0917 6.7 13 7.5 13C8.03333 13 8.546 13.0457 9.038 13.137C9.52933 13.229 10.0167 13.35 10.5 13.5C10.1167 13.7 9.75433 13.9333 9.413 14.2C9.071 14.4667 8.75 14.75 8.45 15.05C8.25 15.0167 8.07933 15 7.938 15H7.5C6.95 15 6.41667 15.0583 5.9 15.175C5.38333 15.2917 4.88333 15.4667 4.4 15.7C4.93333 16.2333 5.52933 16.6793 6.188 17.038C6.846 17.396 7.55 17.65 8.3 17.8ZM10 20C8.61667 20 7.31667 19.7373 6.1 19.212C4.88333 18.6873 3.825 17.975 2.925 17.075C2.025 16.175 1.31267 15.1167 0.788 13.9C0.262667 12.6833 0 11.3833 0 10C0 8.61667 0.262667 7.31667 0.788 6.1C1.31267 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.31233 6.1 0.787C7.31667 0.262333 8.61667 0 10 0C11.3833 0 12.6833 0.262333 13.9 0.787C15.1167 1.31233 16.175 2.025 17.075 2.925C17.975 3.825 18.6873 4.88333 19.212 6.1C19.7373 7.31667 20 8.61667 20 10C20 11.3833 19.7373 12.6833 19.212 13.9C18.6873 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6873 13.9 19.212C12.6833 19.7373 11.3833 20 10 20Z"
                fill="currentColor"
            />
        </svg>`,
            },
            {
                label: 'Log in',
                link: '/login',
                icon: `<svg width="18" height="20" viewBox="0 0 44 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_6156_87)">
                    <path d="M18 14L15.2 16.8L20.4 22H0V26H20.4L15.2 31.2L18 34L28 24L18 14ZM36 38H20V42H36C38.2 42 40 40.2 40 38V10C40 7.8 38.2 6 36 6H20V10H36V38Z" fill="currentColor"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_6156_87">
                    <rect width="48" height="48" fill="white" transform="translate(-4)"/>
                    </clipPath>
                    </defs>
                    </svg>
                    `,
                hide: this.homeService.username() !== '',
                active: true,
            },
        ];
    });

    username = computed(() => this.homeService.username());

    getFirstCharacter = computed(() => this.username().charAt(0).toLowerCase());

    constructor() {
        effect(() => {
            if (!this.profileDropdown()) {
                document.removeEventListener('click', this.clickOutSide);
            }
        });
    }

    mobileMenuToggle() {
        this.mobileMenuOpen.update((v) => !v);
    }

    open() {
        this.profileDropdown.update((v) => !v);
    }

    clickOutSide = (e: PointerEvent) => {
        if (!this.dropDownMenu()?.nativeElement.contains(e.target as Node)) {
            this.profileDropdown.set(false);
        }
    };

    dropdownToggle() {
        this.open();

        if (this.profileDropdown()) {
            document.addEventListener('click', this.clickOutSide);
        }
    }

    async logout() {
        sessionStorage.removeItem('username');
        this.homeService.username.set('');
        await this.router.navigate(['/']);
    }
}
