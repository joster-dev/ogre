import { Component } from '@angular/core';

@Component({
  selector: 'ogre-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isBotEnabled = false;
  isBotGoFirst = false;
}
