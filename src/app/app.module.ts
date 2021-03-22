import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http'
import { VservService } from './verify/vserv.service'
import { from } from 'rxjs';
import { VerifyComponent } from './verify/verify.component';
@NgModule({
  declarations: [
    AppComponent,
    VerifyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,                             
    ReactiveFormsModule  ,
    HttpClientModule
  ],
  providers: [
    VservService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
