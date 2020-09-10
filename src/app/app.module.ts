import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import {createCustomElement} from '@angular/elements';
import { AppRoutingModule } from './app-routing.module';
import { ChartComponent } from './chart/chart.component';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    ChartComponent,
    AppComponent,
    FooterComponent
  
  ],
  entryComponents: [AppComponent, ChartComponent],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const el = createCustomElement(AppComponent, 
                                 { injector: this.injector });
    customElements.define('my-own-element', el);    const el2 = createCustomElement(ChartComponent, 
                                 { injector: this.injector });
    customElements.define('cust', el2);
  }
 }
