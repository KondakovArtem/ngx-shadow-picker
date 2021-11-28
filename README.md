![npm](https://img.shields.io/npm/v/ngx-shadow-picker) ![NPM](https://img.shields.io/npm/l/ngx-shadow-picker)

# NgxShadowPicker

A shadow picker inspired by the Chromium devtools.  This is a slight reimagining and a port of the component [react-shadow-picker](https://www.npmjs.com/package/react-shadow-picker)

## Development server

Run `yarn storybook` for a dev server. 

![Demo](https://raw.githubusercontent.com/KondakovArtem/ngx-shadow-picker/master/src/assets/demo.png)

[**Live Demo**](https://www.chromatic.com/component?appId=61a14f59d1e351003a3cace0&name=ShadowPicker&buildNumber=1&historyLengthAtIndex=21&distanceToMoveBack=-1&componentInspectorKey=61a16ba55b7569003a7aa601-1200-interactive-true)

## Installation

```sh
yarn add ngx-shadow-picker
```

## Usage

The component can be used either in a Controlled or Uncontrolled way.
If you pass the value back to the component, it will be controlled.

```typescript
import { ShadowPickerModule } from 'ngx-shadow-picker';

...

@NgModule({
    declarations: [],
    imports: [
      ...
      ShadowPickerModule
    ],
    providers: [],
})
export class AppModule {}

```

Add component to the template
```html
  ...
    <shadow-picker 
      [showSample]="true" 
      [value]="value" 
      (onChange)="value = $event"
    ></shadow-picker>
  ...
```

## Styling

Add scss style in your project

```scss
  @import '~ngx-shadow-picker/styles/shadow-picker';
```


## Styling customization

There are several scss variables that can be overridden
```scss
  $shadow-picker-empty-bg-size: 10px !default;
  $shadow-picker-background: #2a2a2a !default;
  $shadow-picker-width: 256px !default;
  $shadow-picker-font-size: 14px !default;
  $shadow-picker-color: #bec6cf !default;
  $shadow-picker-padding: 8px !default;
  $shadow-picker-offsetgrid-size: 100px !default;
  $shadow-picker-control-color: #4285f4 !default;
  $shadow-picker-control-border-radius: 2px !default;
```
