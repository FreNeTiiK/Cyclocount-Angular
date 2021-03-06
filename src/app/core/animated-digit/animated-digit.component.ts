import {
    Component,
    ElementRef,
    Input,
    AfterViewInit,
    ViewChild,
    OnChanges,
    SimpleChanges
} from '@angular/core';

@Component({
    selector: 'animated-digit',
    templateUrl: 'animated-digit.component.html',
})
export class AnimatedDigitComponent implements AfterViewInit {
    @Input() duration: number;
    @Input() digit: number;
    @Input() steps: number;
    @ViewChild('animatedDigit', {read: ElementRef}) animatedDigit: ElementRef;

    ngAfterViewInit(): void
    {
        setTimeout(() => {
            if (this.digit) {
                this.animateCount();
            }
        });
    }

    animateCount(): void
    {
        if (!this.duration) {
            this.duration = 1000;
        }

        if (typeof this.digit === 'number') {
            this.counterFunc(this.digit, this.duration, this.animatedDigit);
        }
    }

    counterFunc(endValue, durationMs, element): void
    {
        if (!this.steps) {
            this.steps = 12;
        }

        const stepCount = Math.abs(durationMs / this.steps);
        const valueIncrement = (endValue - 0) / stepCount;
        const sinValueIncrement = Math.PI / stepCount;

        let currentValue = 0;
        let currentSinValue = 0;

        const step = (): void => {
            currentSinValue += sinValueIncrement;
            currentValue += valueIncrement * Math.sin(currentSinValue) ** 2 * 2;

            element.nativeElement.textContent = Math.abs(Math.floor(currentValue));

            if (currentSinValue < Math.PI) {
                window.requestAnimationFrame(step);
            }
        };

        step();
    }
}
