import { moduleMetadata, Story, Meta, componentWrapperDecorator } from '@storybook/angular';
import { CommonModule } from '@angular/common';

import { ShadowPickerComponent } from './shadow-picker.component';
import { ShadowPickerModule } from './shadow-picker.module';

export default {
    title: 'ShadowPicker',
    component: ShadowPickerComponent,
    decorators: [
        moduleMetadata({
            imports: [CommonModule, ShadowPickerModule],
        }),
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
} as Meta;

const Template: Story<ShadowPickerComponent> = (props) => ({ props });

export const Basic = Template.bind({});
Object.assign(Basic, {
    args: {
        value: '9px 6px 1px 1px #9188884b',
        showSample: true,
    },
    argTypes: { onChange: { action: 'clicked' } },
});
