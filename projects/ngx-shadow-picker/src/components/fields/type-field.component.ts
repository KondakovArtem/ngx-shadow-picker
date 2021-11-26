import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { ShadowPosition } from '../../types';

@Component({
    selector: 'type-field',
    template: `
        <div class="sp-type-field">
            <label class="sp-label">Type</label>
            <div class="sp-group">
                <div
                    class="sp-button sp-position sp-button-out"
                    [ngClass]="[value === 'outside' ? 'active' : '']"
                    (click)="onChange.emit('outside')"
                >
                    Outside
                </div>
                <div
                    class="sp-button sp-position sp-button-in"
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
