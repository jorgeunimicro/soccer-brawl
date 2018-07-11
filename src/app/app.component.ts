import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from './shared/auth.service';
import {environment as env} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'Soccer Brawl';
  loggedIn = false;
  isAdmin = false;
  constructor(private auth: AuthService) {

    auth.user.subscribe(x => {
      if (!x) {
        this.loggedIn = false;
        this.isAdmin = false;
        return;
      }
      this.loggedIn = true;
      this.isAdmin = env.admins.indexOf(x.email) >= 0;
    });
  }
}
