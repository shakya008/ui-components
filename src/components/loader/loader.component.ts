import { Component, Input, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { DEFAULT_NAME } from './constant';
import { LoaderService } from './loader.service';


@Component({
    selector: 'ui-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['loader.css']
})
export class LoaderComponent implements OnInit, OnDestroy {
    @Input() name: string = DEFAULT_NAME;
    @Input() className: string;
    @Input() overlay: boolean = false;
    showLoader: boolean = false;
    private _subscriber: Subscription;
    constructor(private _srv: LoaderService, private _cdr: ChangeDetectorRef) {

    }
    subscribeLoader() {
        this._subscriber = this._srv.notify(this.name)
        .subscribe(res => {
            this.showLoader = res;

        });
    }
    ngOnInit() {
        this.subscribeLoader();
    }
    ngOnDestroy() {
        if (this._subscriber) {
            this._subscriber.unsubscribe();
            this._subscriber = null;
        }
    }
}
