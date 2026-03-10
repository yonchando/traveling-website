import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendingDestinations } from './trending-destinations';

describe('TrendingDestinations', () => {
    let component: TrendingDestinations;
    let fixture: ComponentFixture<TrendingDestinations>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TrendingDestinations],
        }).compileComponents();

        fixture = TestBed.createComponent(TrendingDestinations);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
