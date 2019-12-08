import { Component } from '@angular/core';
import { Game } from './game';

@Component({
  selector: 'ogre-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  game = new Game();
}
