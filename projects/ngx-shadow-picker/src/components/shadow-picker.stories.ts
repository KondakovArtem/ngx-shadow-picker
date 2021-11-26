import { moduleMetadata, Story, Meta, componentWrapperDecorator } from '@storybook/angular';
import { CommonModule } from '@angular/common';

import { ShadowPickerComponent } from './shadow-picker.component';
import { ShadowPickerModule } from './shadow-picker.module';

export default {
    title: 'ShadowPicker',
    component: ShadowPickerComponent,
    decorators: [
        moduleMetadata({
            declarations: [],
            imports: [CommonModule, ShadowPickerModule],
        }),
        componentWrapperDecorator(
            (story) => `
            <style>
                .example-wrapper {
                    align-items: center;
                    flex: 1;
                    height: 300px;
                    max-width: 400px;
                }
                .example-wrapper, .wrapper {
                    display: flex;
                    justify-content: center;
                    min-width: 300px;
                }
                .example {
                    background: #f5f5f5;
                    border-radius: 100%;
                    height: 200px;
                    width: 200px;
                }
                .example-container {
                    display: flex;
                }
            </style>
            <div class="example-container">
                <shadow-picker [value]="value" (onChange)="value = $event"></shadow-picker>
                <div class="example-wrapper shadow-picker-sample-bg">
                    <div class="example" [ngStyle]="{'box-shadow': value}"></div>
                </div>
            </div>
        `,
        ),
    ],
} as Meta;

const Template: Story<ShadowPickerComponent> = (props: any) => ({
    props,
});

export const Default = Template.bind({});
Object.assign(Default, {
    args: {
        value: 'inset 1px 1px 1px 1px #000000',
    },
});
