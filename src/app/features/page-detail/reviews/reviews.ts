import { Component, inject, input, OnInit, signal } from '@angular/core';
import clsx from 'clsx';
import { RateStar } from '@/app/shared/components/rate-star/rate-star';
import { Thumbnail } from '@/app/shared/components/thumbnail/thumbnail';
import { Button } from '@/app/shared/components/button/button';
import { Input } from '@/app/shared/components/forms/input/input';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Comment } from '@/app/interfaces/comment-interface';
import { range } from '@/app/shared/ultils/iterator-util';
import { ApiService } from '@/app/shared/services';
import { Product } from '@/app/interfaces/product-interface';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-reviews',
    imports: [RateStar, Thumbnail, Button, Input, FormsModule, ReactiveFormsModule, DatePipe],
    templateUrl: './reviews.html',
    styleUrl: './reviews.css',
})
export class Reviews implements OnInit {
    api = inject(ApiService);

    product = input.required<Product>();

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

    category = signal('');

    form = new FormGroup<any>({
        name: new FormControl(null, [Validators.required]),
        email: new FormControl(null, [Validators.required, Validators.email]),
        title: new FormControl(null, [Validators.required]),
        comment: new FormControl(null, [Validators.required]),
        rate: new FormControl(-1, [Validators.required, Validators.min(1)]),
    });

    get name() {
        return this.form.get('name') as FormControl;
    }
    get email() {
        return this.form.get('email') as FormControl;
    }
    get title() {
        return this.form.get('title') as FormControl;
    }
    get comment() {
        return this.form.get('comment') as FormControl;
    }
    get rate() {
        return this.form.get('rate') as FormControl;
    }

    ngOnInit() {
        this.api
            .getComments(0, 5, {
                'productId:contains': this.product().id,
            })
            .subscribe((res) => {
                this.comments.set(res.data);
            });
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

        this.api.comment(this.form.value, this.product().id).subscribe((res) => {
            this.comments.update((comments) => [...comments, res]);
            this.form.reset();
        });
    }

    isInvalid(form: FormControl) {
        return form.invalid && (form.dirty || form.touched);
    }

    protected getRange(number: number) {
        return range(number);
    }
}
