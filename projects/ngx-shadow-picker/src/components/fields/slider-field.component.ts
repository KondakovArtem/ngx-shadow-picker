import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
    TemplateRef,
} from '@angular/core';
import { useUnitValue } from '../utils';

interface ISliderFieldState {
    amount: number;
    unit: string;
}

@Component({
    selector: 'slider-field',
    template: `
        <div class="sp-slider-field">
            <label class="sp-label">{{ title }}</label>
            <input-field
                style="flex-grow: 1; display:flex;"
                [value]="value"
                (onChange)="onChange.emit($event)"
                [template]="inputTpl"
            ></input-field>

            <ng-container *ngIf="sliderTpl">
                <ng-container
                    *ngTemplateOutlet="sliderTpl; context: templateContext"
                ></ng-container>
            </ng-container>
            <input
                *ngIf="!sliderTpl"
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
    @Input() inputTpl?: TemplateRef<any>;
    @Input() sliderTpl?: TemplateRef<any>;
    @Output() onChange = new EventEmitter<string>();

    public setState(newState: ISliderFieldState): void {
        this.state = newState;
        this.templateContext = {
            ...this.templateContext,
            value: this.state.amount,
        };
    }

    public state: ISliderFieldState = {
        amount: 0,
        unit: 'px',
    };

    public templateContext: {
        value?: number;
        onChange: {
            emit($event: string): void;
        };
    } = {
        value: 0,
        onChange: {
            emit: ($event: string) => this.changed($event),
        },
    };

    public changed($event: string): void {
        const amount = parseInt($event, 10);
        this.setState({
            ...this.state,
            amount,
        });
        this.onChange.emit(`${this.state.amount}${this.state.unit}`);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.value) {
            this.setState(useUnitValue(changes.value.currentValue));
        }
    }
}
