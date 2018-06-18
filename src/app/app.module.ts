import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { BlackCanvasComponent } from './implementations/webgl/examples/black-canvas/black-canvas.component';
import { GettingStartedComponent } from './implementations/webgl/examples/mdn-tutorial/1-getting-started/getting-started.component';
import { AddingContentComponent } from './implementations/webgl/examples/mdn-tutorial/2-adding-content/adding-content.component';


@NgModule({
    declarations: [
        AppComponent,
        BlackCanvasComponent,
        GettingStartedComponent,
        AddingContentComponent
    ],
    imports: [
        BrowserModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
