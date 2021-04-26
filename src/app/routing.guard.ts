import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './core/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoutingGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.auth.authenticated) {
      this.router.navigate(['/signin'])
      console.log('Not authorised.');
      return false;
    }
    return true;
  }
  
}
