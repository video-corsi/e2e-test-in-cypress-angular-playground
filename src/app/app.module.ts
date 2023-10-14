import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([{ path: 'material-dnd-demo', loadChildren: () => import('./features/material-dnd-demo/material-dnd-demo.module').then(m => m.MaterialDndDemoModule) }, { path: 'home', loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule) }])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
