import { Component } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GMoney RM Portal';
  mediaSub : Subscription | undefined;
  constructor(){}
//private mediaObserver : MediaObserver
    ngOnInit(){
      // this.mediaSub = this.mediaObserver.media$.subscribe((result : MediaChange) => {
      //   console.log(result.mqAlias);
      // })
    }
    
  
}
