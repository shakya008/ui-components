import { Component } from '@angular/core';

import { LoaderService } from '../../components/loader';
/**
 * @class
 * This is the parent component of the project which will be user to drive the project
 */
 @Component({
     selector: 'home-page',
     templateUrl: './home-page.html'
 })

 export class HomeComponent {
     loaderName = 'home-loader';
     constructor(private _loader: LoaderService) {
     }
     showLoader( show) {
         this._loader.showLoader(this.loaderName, show);
     }
     unregister() {
         this._loader.unregister(this.loaderName);
     }
 }
