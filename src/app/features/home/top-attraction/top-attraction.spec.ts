import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopAttraction } from './top-attraction';

describe('TopAttraction', () => {
    let component: TopAttraction;
    let fixture: ComponentFixture<TopAttraction>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TopAttraction],
        }).compileComponents();

        fixture = TestBed.createComponent(TopAttraction);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
