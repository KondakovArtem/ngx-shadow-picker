import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
    TemplateRef,
} from '@angular/core';

import { ShadowPosition } from '../../types';

@Component({
    selector: 'type-field',
    template: `
        <div class="sp-type-field">
            <label class="sp-label">Type</label>
            <div class="sp-group">
                <ng-container *ngIf="template">
                    <ng-container
                        *ngTemplateOutlet="template; context: { value: value, onChange: onChange }"
                    ></ng-container>
                </ng-container>
                <ng-container *ngIf="!template">
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
                </ng-container>
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypeFieldComponent {
    @Input() value?: ShadowPosition;
    @Input() template?: TemplateRef<any>;
    @Output() onChange = new EventEmitter<ShadowPosition>();
}
