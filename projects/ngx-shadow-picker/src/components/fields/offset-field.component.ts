import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { ShadowOffset, ShadowPickerParams } from '../../types';

@Component({
    selector: 'offset-field',
    template: `
        <div class="offset-field">
            <div class="inputs">
                <div class="row">
                    <label class="shadow-picker-label">X Offset</label>
                    <input-field
                        [value]="value.x"
                        (onChange)="inputChange('x', $event)"
                    ></input-field>
                </div>
                <div class="row">
                    <label class="shadow-picker-label">Y Offset</label>
                    <input-field
                        [value]="value.y"
                        (onChange)="inputChange('y', $event)"
                    ></input-field>
                </div>
            </div>

            <div class="grid">
                <offset-grid
                    [offset]="{ x: xAmount, y: yAmount }"
                    onChange="{gridChange($event)}"
                ></offset-grid>
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OffsetFieldComponent {
    @Input() value!: ShadowPickerParams['offset'];
    @Output() onChange = new EventEmitter<ShadowPickerParams['offset']>();

    public xAmount = 0;
    public xUnit = 'px';
    public yAmount = 0;
    public yUnit = 'px';

    public gridChange({ x, y }: ShadowOffset): void {
        const { xUnit, yUnit } = this;
        this.onChange.emit({ x: x + xUnit, y: y + yUnit });
    }

    public inputChange(axis: 'x' | 'y', val: string): void {
        if (this.value) {
            this.onChange.emit({
                ...this.value,
                [axis]: val,
            });
        }
    }
}
