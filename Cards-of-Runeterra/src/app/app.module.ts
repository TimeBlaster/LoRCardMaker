import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './containers/home/home.component';
import { materialImports } from './material.import';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ...materialImports,
  ],
  providers: [],
  bootstrap: [HomeComponent]
})
export class AppModule { }
