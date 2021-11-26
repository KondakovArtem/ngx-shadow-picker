import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
} from '@angular/core';

import { ShadowOffset, ShadowPickerParams, ShadowPosition } from '../types';
import { buildShadowString, parseShadowString } from './utils';

const defaultParams: ShadowPickerParams = {
    blur: '0',
    color: '#000000',
    offset: {
        y: '0',
        x: '0',
    },
    position: 'outside',
    spread: '0',
};

@Component({
    selector: 'shadow-picker',
    templateUrl: './shadow-picker.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShadowPickerComponent implements OnChanges {
    @Input() value?: string;
    @Input() showSample = false;
    @Input() className = '';
    @Output() onChange = new EventEmitter<string>();

    public state?: ShadowPickerParams;
    public sample?: string;

    private setNewState(state: ShadowPickerParams, emit = true): void {
        this.state = state;
        this.sample = buildShadowString(this.state);
        if (emit) this.onChange.emit(this.sample);
    }

    public updateState(
        column: keyof ShadowPickerParams,
        value: string | ShadowOffset | ShadowPosition | undefined,
    ): void {
        this.setNewState({
            ...this.state,
            [column]: value,
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.value) {
            this.setNewState(
                parseShadowString(changes.value.currentValue) || { ...defaultParams },
                false,
            );
        }
    }
}
