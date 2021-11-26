import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ShadowOffset, ShadowPickerParams, ShadowPosition } from '../types';

@Component({
    selector: 'shadow-picker',
    templateUrl: './shadow-picker.component.html',
    styleUrls: ['../../styles/shadow-picker.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShadowPickerComponent {
    public state: ShadowPickerParams = {};

    public updateState(
        column: keyof ShadowPickerParams,
        value: string | ShadowOffset | ShadowPosition | undefined,
    ): void {
        console.log(column, value);
        this.state = {
            ...this.state,
            [column]: value,
        };
        // const newParams = { ...state, [column]: value };
        // onChange(buildShadowString(newParams));
        // !isControlled && setState(newParams);
    }
}
