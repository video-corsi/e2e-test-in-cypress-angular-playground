import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MaterialDndDemoComponent } from './material-dnd-demo.component';


const routes: Routes = [
  { path: '', component: MaterialDndDemoComponent }
];

@NgModule({
  declarations: [
    MaterialDndDemoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class MaterialDndDemoModule { }
