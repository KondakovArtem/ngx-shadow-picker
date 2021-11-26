import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { OffsetFieldComponent } from './fields/offset-field.component';
import { SliderFieldComponent } from './fields/slider-field.component';
import { TypeFieldComponent } from './fields/type-field.component';
import { InputFieldComponent } from './inputs/input.component';
import { OffsetGridComponent } from './inputs/offset-grid.component';
import { ShadowPickerComponent } from './shadow-picker.component';

@NgModule({
    declarations: [
        ShadowPickerComponent,
        TypeFieldComponent,
        OffsetFieldComponent,
        InputFieldComponent,
        OffsetGridComponent,
        SliderFieldComponent,
    ],
    imports: [CommonModule, FormsModule],
    exports: [ShadowPickerComponent],
})
export class ShadowPickerModule {}
