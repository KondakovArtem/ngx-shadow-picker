import { moduleMetadata, Story, Meta } from '@storybook/angular';
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
    ],
    argTypes: {},
} as Meta;

const Template: Story<ShadowPickerComponent> = (props: any) => ({
    props,
});

export const Default = Template.bind({});
