import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ShadowPickerModule } from 'ngx-shadow-picker';

import { AppComponent } from './app.component';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, ShadowPickerModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
