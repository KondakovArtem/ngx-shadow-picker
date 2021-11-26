![npm](https://img.shields.io/npm/v/ngx-shadow-picker) ![NPM](https://img.shields.io/npm/l/ngx-shadow-picker)

# NgxShadowPicker

A shadow picker inspired by the Chromium devtools.  This is a slight reimagining and a port of the component [react-shadow-picker](https://www.npmjs.com/package/react-shadow-picker)

## Development server

Run `yarn storybook` for a dev server. 

![Demo](https://raw.githubusercontent.com/KondakovArtem/ngx-shadow-picker/master/src/assets/demo.png)

[**Live Demo**](https://react-shadow-picker.now.sh)

### Installation

```sh
yarn add ngx-shadow-picker
```

### Usage

The component can be used either in a Controlled or Uncontrolled way.
If you pass the value back to the component, it will be controlled.

```typescript
import { NgxShadowPickerModule } from "ngx-shadow-picker";

```

#### Styling

Add scss style in your project

```scss
  @import '~ngx-shadow-picker/styles/shadow-picker';
```

