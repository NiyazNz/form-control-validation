import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormControlValidationModule} from '@enzedd/form-control-validation';
import {HeaderComponent} from './header/header.component';
import {SidenavComponent} from './sidenav/sidenav.component';
import {SimpleComponent} from './examples/simple.component';
import {ErrorMessagesComponent} from './examples/error-messages.component';
import {CodeModule} from './code/code.module';
import {ErrorMessagesConfigurationModule} from './examples/error-messages-configuration.component';
import {CustomErrorModule} from './examples/custom-error.component';
import {FormErrorComponent} from './examples/form-error.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavComponent,
    SimpleComponent,
    ErrorMessagesComponent,
    FormErrorComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    FormControlValidationModule,
    CodeModule,
    ErrorMessagesConfigurationModule,
    CustomErrorModule,
    AppRoutingModule
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
