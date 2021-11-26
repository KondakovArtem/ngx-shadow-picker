import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { ShadowPosition } from '../../types';

@Component({
    selector: 'type-field',
    template: `
        <div class="shadow-picker-wrapper">
            <label class="shadow-picker-label">Type</label>
            <div class="shadow-picker-group">
                <div
                    class="shadow-picker-button shadow-picker__position"
                    [ngClass]="[value === 'outside' ? 'active' : '']"
                    (click)="onChange.emit('outside')"
                >
                    Outside
                </div>
                <div
                    class="shadow-picker-button shadow-picker__position"
                    [ngClass]="[value === 'inside' ? 'active' : '']"
                    (click)="onChange.emit('inside')"
                >
                    Inside
                </div>
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypeFieldComponent {
    @Input() value?: ShadowPosition;
    @Output() onChange = new EventEmitter<ShadowPosition>();
}
