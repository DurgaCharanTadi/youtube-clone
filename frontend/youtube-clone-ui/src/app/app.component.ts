import {Component, inject} from '@angular/core';
import {LoginResponse, OidcSecurityService, StsConfigLoader} from 'angular-auth-oidc-client';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'youtube-clone-ui';

  constructor(private oidcSecurityService: OidcSecurityService,
              private stsConfigLoader: StsConfigLoader) {
  }

  ngOnInit() {
    this.oidcSecurityService
      .checkAuth()
      .subscribe(({isAuthenticated}) =>{
        console.log('app is authenticated',isAuthenticated);
      });
  }
}
