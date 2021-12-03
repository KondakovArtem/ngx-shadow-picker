import { FormsModule } from '@angular/forms';
import { moduleMetadata, Story, Meta, componentWrapperDecorator } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextModule } from 'primeng/inputtext';
import { SliderModule } from 'primeng/slider';

import { ShadowPickerComponent } from './shadow-picker.component';
import { ShadowPickerModule } from './shadow-picker.module';

export default {
    title: 'ShadowPicker',
    component: ShadowPickerComponent,
    decorators: [
        moduleMetadata({
            imports: [CommonModule, ShadowPickerModule],
        }),
    ],
} as Meta;

const Template: Story<ShadowPickerComponent> = (props) => ({ props });

export const Basic = Template.bind({});
Object.assign(Basic, {
    args: {
        value: '9px 6px 1px 1px #9188884b',
        showSample: true,
    },
    argTypes: { onChange: { action: 'clicked' } },
    decorators: [
        componentWrapperDecorator(
            () => `
        <shadow-picker
            [showSample]="showSample"
            [value]="value"
            (onChange)="onChange($event); value = $event;"
        ></shadow-picker>
        <div>{{value}}</div>
    `,
        ),
    ],
});

export const RGBA = Template.bind({});
Object.assign(RGBA, {
    args: {
        value: '9px 6px 1px 1px rgba(134, 32, 34, 15%)',
        showSample: true,
    },
    argTypes: { onChange: { action: 'clicked' } },
    decorators: [
        componentWrapperDecorator(
            () => `
      <shadow-picker
          [showSample]="showSample"
          [value]="value"
          (onChange)="onChange($event); value = $event;"
      ></shadow-picker>
      <div>{{value}}</div>
  `,
        ),
    ],
});

export const CustomControls = Template.bind({});
Object.assign(CustomControls, {
    args: {
        value: '9px 6px 1px 1px rgba(134, 32, 34, 15%)',
        showSample: true,
    },
    decorators: [
        moduleMetadata({
            imports: [
                CommonModule,
                ShadowPickerModule,
                SelectButtonModule,
                FormsModule,
                InputTextModule,
                SliderModule,
            ],
        }),
        componentWrapperDecorator(
            () => `

            <shadow-picker
              [showSample]="showSample"
              [value]="value"
              (onChange)="onChange($event); value = $event;"
            >
              <ng-template #type let-value="value" let-onChange="onChange">
                <p-selectButton
                  [options]="[
                    {label: 'Inside', value: 'inside'},
                    {label: 'Outside', value: 'outside'}
                  ]"
                  [ngModel]="value"
                  (ngModelChange)="onChange.emit($event)"
                ></p-selectButton>
              </ng-template>

              <ng-template #input let-value="value" let-onChange="onChange">
                <input style="width: 16px; flex: 1" type="text" [ngModel]="value" (ngModelChange)="onChange.emit($event)" pInputText />
              </ng-template>

              <ng-template #slider let-value="value" let-onChange="onChange" let-max="max">
                <p-slider [ngStyle]="{flex: 1}" [max]="max" [ngModel]="value" (ngModelChange)="onChange.emit($event)"></p-slider>
              </ng-template>

            </shadow-picker>
            <div>{{value}}</div>


`,
        ),
    ],
    argTypes: { onChange: { action: 'clicked' } },
});
