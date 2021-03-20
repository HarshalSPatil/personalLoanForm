import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http'
import {DataapiService} from './dataapi.service'
import { from } from 'rxjs';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,                             
    ReactiveFormsModule  ,
    HttpClientModule
  ],
  providers: [
    DataapiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
