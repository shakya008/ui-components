import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DEFAULT_NAME } from './constant';

/**
* This is loader service which is used for loader registration , display, hide  purpose
*/

@Injectable()
export class LoaderService {
    private _obs$: any = {};

    /**
    * This function registers the loader component instance.
    * @param {string} name - string identifier to register
    * @default
    */
    public register(name: string = DEFAULT_NAME) {
        if (!this._obs$[name]) {
            this._obs$[name] = [];
        }
    }
    /**
    * This function unregister the registration made for loader
    * @param {string} name -  String identifier on which loader registered
    * @param {boolean} force - Forcefully unregister
    */
    public unregister(name: string, force: boolean= false) {
        if (this._obs$[name]) {
                this._obs$[name].forEach(obs => {
                    obs.unsubscribe();
                });
                this._obs$[name] = [];
            }
    }
    /**
    * This function triggers the event to display the loader registered on `name` identifier.
    * @param {string} name - String identifier for a spectific loader.
    */
    public showLoader(name: string, show: boolean = true) {
        if (this._obs$[name]) {
            this._obs$[name].forEach(obs => {
                obs.next(show);
            });
        }
    }
    /**
    * This function is used to subscribe the loader component on show/hide events.
    * @param {string} name - String identifier for a spectific loader.
    */
    public notify(name: string= DEFAULT_NAME) : Observable<any> {
        return Observable.create((obs) => {
            this._obs$[name].push(obs);
        });
    }

}
