import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { routing } from '../routes/routes';
import { AppComponent } from './app.component';
import { HomeModule } from '../containers/home/home.module';



@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule,
    BrowserAnimationsModule,
    routing,
    HomeModule
  ],
  declarations: [
    AppComponent
  ],
  exports: [
    AppComponent
  ],
  providers: [ ],
  bootstrap: [ AppComponent]
})
export class AppModule { }
