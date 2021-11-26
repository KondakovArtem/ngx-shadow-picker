import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
} from '@angular/core';
import { debounce, IColorState, parseHexColor } from '../utils';

const defaultColorState: IColorState = {
    alpha: 0,
    color: '#000000',
};

@Component({
    selector: 'color-field',
    template: `<div class="sp-color-field">
        <label class="sp-label">{{ title }}</label>
        <input-field
            style="flex-grow: 1; display:flex;"
            [value]="value"
            (onChange)="onChange.emit($event)"
        ></input-field>
        <div class="sp-color-controller">
            <input type="color" [ngModel]="state.color" (ngModelChange)="updated($event)" />
            <input
                class="sp-slider"
                type="range"
                [ngModel]="state.alpha"
                (ngModelChange)="updatedAlpha($event)"
                max="255"
            />
        </div>
    </div>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorFieldComponent implements OnChanges {
    @Input() title?: string;
    @Input() value?: string;
    @Output() onChange = new EventEmitter<string>();

    public state: IColorState = { ...defaultColorState };
    public updated = debounce(($event: string): void => {
        this.onChange.emit(`${$event}${this.state.alpha.toString(16).padStart(2, '0')}`);
    });

    public updatedInput($event: string): void {
        this.onChange.emit($event);
    }

    public updatedAlpha($event: string): void {
        const hex = parseInt($event, 10).toString(16).padStart(2, '0');
        this.onChange.emit(`${this.state.color}${hex}`);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.value) {
            this.state = parseHexColor(changes.value.currentValue) || { ...defaultColorState };
        }
    }
}
