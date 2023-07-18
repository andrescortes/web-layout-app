import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Route, RouterStateSnapshot, UrlSegment, CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

// --** Deprecated **--
// @Injectable({ providedIn: 'root' })
// export class AuthGuard implements CanMatch, CanActivate {

//   constructor() { }

//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
//     console.log('canActivate');
//     console.log({ route, state });
//     return true;
//   }

//   canMatch(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> {
//     console.log('canMatch');
//     console.log({ route, segments });
//     return true;
//   }
// }

const checkAuthStatus = (): boolean | Observable<boolean> => {
  //injenting authService and router
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.checkoutAuthentication().pipe(
    tap((isAuthenticated) => {
      if (!isAuthenticated) {
        router.navigate(['/auth/login'])
      }
    }),
  );
}

export const canMatchGuard: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
  return checkAuthStatus();
};

export const canActivateGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return checkAuthStatus();
};

