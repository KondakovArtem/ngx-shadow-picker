import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
} from '@angular/core';

import { ShadowOffset, ShadowOffsetUnit, ShadowPickerParams } from '../../types';
import { Offset } from '../inputs/offset-grid.component';
import { useOffsetUnit } from '../utils';

@Component({
    selector: 'offset-field',
    template: `
        <div class="sp-offset-field">
            <div class="sp-inputs">
                <div class="sp-row">
                    <label class="sp-label">X Offset</label>
                    <input-field
                        style="flex: 1; display: flex;"
                        [value]="value?.x"
                        (onChange)="inputChange('x', $event)"
                    ></input-field>
                </div>
                <div class="sp-row">
                    <label class="sp-label">Y Offset</label>
                    <input-field
                        style="flex: 1; display: flex;"
                        [value]="value?.y"
                        (onChange)="inputChange('y', $event)"
                    ></input-field>
                </div>
            </div>
            <div class="sp-grid">
                <offset-grid [offset]="offsetUnit" (onChange)="gridChange($event)"></offset-grid>
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OffsetFieldComponent implements OnChanges {
    @Input() value!: ShadowPickerParams['offset'];
    @Output() onChange = new EventEmitter<ShadowPickerParams['offset']>();

    public offsetUnit: ShadowOffsetUnit = {
        x: 0,
        y: 0,
        xUnit: 'px',
        yUnit: 'px',
    };

    public gridChange({ x, y }: Offset): void {
        const { xUnit, yUnit } = this.offsetUnit;
        this.onChange.emit({ x: `${x}${xUnit}`, y: `${y}${yUnit}` });
    }

    public inputChange(axis: 'x' | 'y', val: string): void {
        if (this.value) {
            this.onChange.emit({
                ...this.value,
                [axis]: val,
            });
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.value) {
            this.offsetUnit = useOffsetUnit(changes.value.currentValue);
        }
    }
}
