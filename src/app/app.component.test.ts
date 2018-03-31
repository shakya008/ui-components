import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';


import { AppComponent } from './app.component';

let compInstance: AppComponent;
let fixture: ComponentFixture<AppComponent>;
let el: HTMLElement;
const oldResetTestingModule = TestBed.resetTestingModule;

describe('Component : AppComponent', () => {
  afterAll(() => {
      TestBed.resetTestingModule = oldResetTestingModule;
      TestBed.resetTestingModule();
  });
  beforeAll(() => {

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
        imports: [
            BrowserModule,
            RouterTestingModule,
            HttpModule
        ],
        declarations: [
          AppComponent,
        ],
        providers: [ ]
    });

    TestBed.resetTestingModule = () => TestBed;
  });
  beforeEach(() => {
      fixture = TestBed.createComponent(AppComponent);
      compInstance = fixture.componentInstance;
  });
  it('should inject the component', () => {
    expect(compInstance).toBeTruthy();
  });
});
