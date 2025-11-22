import { Component, signal } from '@angular/core';
import { Button } from '@/app/shared/components/button/button';

@Component({
    selector: 'app-faq',
    imports: [Button],
    templateUrl: './faq.html',
    styleUrl: './faq.css',
})
export class Faq {
    questions = signal([
        {
            question: 'Can I get the refund?',
            answer: `
            Phang Nga Bay Sea Cave Canoeing & James Bond Island w/ Buffet Lunch by Big Boat cancellation policy: For a
            full
            refund, cancel at least 24 hours in advance of the start date of the experience. Discover and book Phang Nga
            Bay
            Sea Cave Canoeing & James Bond Island w/ Buffet Lunch by Big Boat
            `,
        },
        {
            question: 'Can I change the travel date?',
            answer: `
            Phang Nga Bay Sea Cave Canoeing & James Bond Island w/ Buffet Lunch by Big Boat cancellation policy: For a
            full
            refund, cancel at least 24 hours in advance of the start date of the experience. Discover and book Phang Nga
            Bay
            Sea Cave Canoeing & James Bond Island w/ Buffet Lunch by Big Boat
            `,
        },
        {
            question: 'When and where does the tour end?',
            answer: `
            Phang Nga Bay Sea Cave Canoeing & James Bond Island w/ Buffet Lunch by Big Boat cancellation policy: For a
            full
            refund, cancel at least 24 hours in advance of the start date of the experience. Discover and book Phang Nga
            Bay
            Sea Cave Canoeing & James Bond Island w/ Buffet Lunch by Big Boat
            `,
        },
        {
            question: 'Do you arrange airport transfers?',
            answer: `
            Phang Nga Bay Sea Cave Canoeing & James Bond Island w/ Buffet Lunch by Big Boat cancellation policy: For a
            full
            refund, cancel at least 24 hours in advance of the start date of the experience. Discover and book Phang Nga
            Bay
            Sea Cave Canoeing & James Bond Island w/ Buffet Lunch by Big Boat
            `,
        },
    ]);
    
    openIndex = signal(0);

    openAnswer(index: number) {
        this.openIndex.set(index);
    }
}
