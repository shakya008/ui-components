import { NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HomeComponent } from './home.component';
import { LoaderModule, LoaderService } from '../../components/loader';



@NgModule({
    imports: [
    FormsModule,
    RouterModule,
    BrowserAnimationsModule,
    LoaderModule
    ],
    declarations: [
    HomeComponent
    ],
    exports: [
    HomeComponent
    ],
    providers: [LoaderService]
})
export class HomeModule { }
