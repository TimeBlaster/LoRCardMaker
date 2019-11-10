import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { materialImports } from './material.import';


const routes: Routes = [];

@NgModule({
  imports: [
    ...materialImports,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
