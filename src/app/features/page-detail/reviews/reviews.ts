import { Component, OnInit, signal } from '@angular/core';
import clsx from 'clsx';
import { RateStar } from '@/app/shared/components/rate-star/rate-star';
import { Thumbnail } from '@/app/shared/components/thumbnail/thumbnail';
import { Button } from '@/app/shared/components/button/button';
import { faker } from '@faker-js/faker/locale/en';
import dayjs from 'dayjs';
import { Input } from '@/app/shared/components/forms/input/input';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

type Comment = {
    name: string;
    title: string;
    comment: string;
    rating: number;
    reviewCount: number;
    date: string;
    posts: string;
};

@Component({
    selector: 'app-reviews',
    imports: [RateStar, Thumbnail, Button, Input, FormsModule, ReactiveFormsModule],
    templateUrl: './reviews.html',
    styleUrl: './reviews.css',
})
export class Reviews implements OnInit {
    reviews = signal([
        {
            name: 'Overall Rating',
            rating: '5.0',
            grade: 'Excellent',
        },
        {
            name: 'Location',
            rating: '5.0',
            grade: 'Excellent',
        },
        {
            name: 'Amenities',
            rating: '5.0',
            grade: 'Excellent',
        },
        {
            name: 'Food',
            rating: '5.0',
            grade: 'Excellent',
        },
        {
            name: 'Price',
            rating: '5.0',
            grade: 'Excellent',
        },
        {
            name: 'Rooms',
            rating: '5.0',
            grade: 'Excellent',
        },
        {
            name: 'Tour Operator',
            rating: '5.0',
            grade: 'Excellent',
        },
    ]);

    comments = signal<Comment[]>([]);

    categories = signal(['Food', 'Location', 'Amenities', 'Rooms', 'Tour Operator']);

    category = signal('');

    form = new FormGroup({
        name: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        title: new FormControl('', [Validators.required]),
        comment: new FormControl('', [Validators.required]),
        rate: new FormControl(-1, [Validators.required]),
    });

    ngOnInit() {
        for (let i = 0; i < 3; i++) {
            this.comments().push({
                name: faker.person.fullName(),
                title: faker.word.adverb(),
                comment: faker.lorem.paragraphs(),
                rating: faker.number.float({
                    min: 1,
                    max: 5,
                    fractionDigits: 1,
                }),
                reviewCount: faker.number.int({ max: 1_000 }),
                date: dayjs(faker.date.past()).format('MMMM YYYY'),
                posts: faker.image.urlPicsumPhotos(),
            });
        }
    }

    getReviewClassName(index: number, isFirst: boolean, isLast: boolean) {
        return clsx('flex items-center justify-between px-8 py-4', {
            'rounded-t-xl bg-warning/10 md:col-span-2': isFirst,
            'bg-warning/4': !isFirst,
            'rounded-b-xl md:rounded-br-xl md:rounded-bl-none': isLast,
            'rounded-bl-xl': this.reviews().length - 2 === index,
        });
    }

    postComment() {
        this.form.markAllAsTouched();
        if (this.form.invalid) {
            return;
        }

        this.comments().push({
            comment: this.form.get('comment')?.value || '',
            date: dayjs().format('MMMM YYYY'),
            name: this.form.get('name')?.value || '',
            posts: '',
            rating: Number(this.form.get('rate')?.value || ''),
            reviewCount: 1,
            title: this.form.get('title')?.value || '',
        });
    }
}
