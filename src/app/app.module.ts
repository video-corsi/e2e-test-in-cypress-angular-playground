import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: 'material-dnd-demo', loadChildren: () => import('./features/material-dnd-demo/material-dnd-demo.module').then(m => m.MaterialDndDemoModule) },
      { path: 'home', loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule) },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ]),
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
