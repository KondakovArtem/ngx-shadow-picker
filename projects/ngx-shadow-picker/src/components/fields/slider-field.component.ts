import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
} from '@angular/core';
import { useUnitValue } from '../utils';

@Component({
    selector: 'slider-field',
    template: `
        <div class="sp-slider-field">
            <label class="sp-label">{{ title }}</label>
            <input-field
                style="flex-grow: 1; display:flex;"
                [value]="value"
                (onChange)="onChange.emit($event)"
            ></input-field>
            <input
                class="sp-slider"
                type="range"
                [ngModel]="state.amount"
                (ngModelChange)="changed($event)"
                max="100"
            />
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SliderFieldComponent implements OnChanges {
    @Input() title?: string;
    @Input() value?: string;
    @Output() onChange = new EventEmitter<string>();

    public state = {
        amount: 0,
        unit: 'px',
    };

    public changed($event: string): void {
        const amount = parseInt($event, 10);
        this.state = {
            ...this.state,
            amount,
        };
        this.onChange.emit(`${this.state.amount}${this.state.unit}`);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.value) {
            this.state = useUnitValue(changes.value.currentValue);
        }
    }
}
