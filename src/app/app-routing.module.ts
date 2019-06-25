import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SimpleComponent} from './examples/simple.component';
import {ErrorMessagesComponent} from './examples/error-messages.component';
import {ErrorMessagesConfigurationComponent} from './examples/error-messages-configuration.component';
import {CustomErrorComponent} from './examples/custom-error.component';
import {FormErrorComponent} from './examples/form-error.component';


export const routes: Routes = [
  {
    path: '', redirectTo: 'simple', pathMatch: 'full'
  }, {
    path: 'simple',
    component: SimpleComponent,
    data: {title: 'Simple example', fileName: 'examples/simple.component.ts'}
  }, {
    path: 'error-messages',
    component: ErrorMessagesComponent,
    data: {title: 'Error messages', fileName: 'examples/error-messages.component.ts'}
  }, {
    path: 'messages-configuration',
    component: ErrorMessagesConfigurationComponent,
    data: {title: 'Messages configuration', fileName: 'examples/error-messages-configuration.component.ts'}
  }, {
    path: 'custom-error-component',
    component: CustomErrorComponent,
    data: {title: 'Custom error component', fileName: 'examples/custom-error.component.ts'}
  }, {
    path: 'form-error-component',
    component: FormErrorComponent,
    data: {title: 'Form  error', fileName: 'examples/form-error.component.ts'}
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
