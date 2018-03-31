import {
    AfterViewInit,
    Directive,
    EventEmitter,
    Input,
    NgModule,
    OnInit,
    Output,
    TemplateRef,
    ViewContainerRef,
    ElementRef
} from '@angular/core';
import { Component } from '@angular/core';

@Component({
    selector: 'header',
    template: '<ng-content></ng-content>'
})
export class Header { }

@Component({
    selector: 'footer',
    template: '<ng-content></ng-content>'
})
export class Footer { }

@Directive({
    selector: '[expTemplateLoader]'
})
export class TemplateLoderDirective implements OnInit {
    @Input('expTemplateLoader') templateRef: TemplateRef<any>;
    @Input() item: any;
    @Input() bindings: Array<{ key: string, value: any }>;
    constructor(private _vcr: ViewContainerRef) { }

    ngOnInit() {
        let bindings = {
            '\$implicit': this.item
        };
        if (this.bindings) {
            this.bindings.forEach((value) => {
                bindings[value.key] = value.value;
            });
        }
        let view = this._vcr.createEmbeddedView(this.templateRef, bindings);
    }
}
@Directive({
    selector: '[expDomLifeCycle]'
})
/**
 * this directive is used for manipulating
 * DOM after it is initialised.
 * After the view is created , emit a Event
 * with  the created DOM element
 */
export class DomLifeCycleDirective implements AfterViewInit {
    /**
     * Event to be triggered after view initialization
     */
    @Output() onAfterViewInit = new EventEmitter();

    constructor(private _el: ElementRef) { }
    /**
     * call the passed method with the DOM element
     * parameter
     */
    ngAfterViewInit() {
        this.onAfterViewInit.emit(this._el.nativeElement);
    }
}

@Directive({
    selector: '[expTemplate]',
})
export class ExpTemplateDirective {
    constructor(public template: TemplateRef<any>) { }
}

@NgModule({
    imports: [],
    exports: [Header, Footer, TemplateLoderDirective, DomLifeCycleDirective, ExpTemplateDirective],
    declarations: [Header, Footer, TemplateLoderDirective, DomLifeCycleDirective, ExpTemplateDirective]
})
export class SharedModule { }
