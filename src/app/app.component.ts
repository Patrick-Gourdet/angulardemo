import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PortfolioApplication'; hasLoaded: boolean = false;
  @Output() finishedLoading: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngAfterViewChecked() {
     // you could also do this after a service call of some sort
     this.finishedLoading.emit(true);
  }
 
}
