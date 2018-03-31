import {
  Component,
  ViewEncapsulation,
  Inject,
  ApplicationRef,
  ViewChild
} from '@angular/core';
import { Observable } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
/**
 * @class
 * This is the parent component of the project which will be user to drive the project
 */
@Component({
  selector: 'app',
  // Global styles imported in the app component.
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app.component.html',
  styles: [require('./app.component.css')],
})

export class AppComponent {

  constructor(public router: Router) {
    }
}
