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
    styleUrls: ['../../styles/shadow-picker.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShadowPickerComponent implements OnChanges {
    public state: ShadowPickerParams = {};

    @Input() value?: string;
    @Output() onChange = new EventEmitter<string>();

    public updateState(
        column: keyof ShadowPickerParams,
        value: string | ShadowOffset | ShadowPosition | undefined,
    ): void {
        this.state = {
            ...this.state,
            [column]: value,
        };
        this.onChange.emit(buildShadowString(this.state));
        // !isControlled && setState(newParams);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.value) {
            this.state = parseShadowString(changes.value.currentValue) || { ...defaultParams };
        }
    }
}
