import { Observable, map, tap } from "rxjs";
import { AuthService } from "../services/auth.service";
import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment } from "@angular/router";

const checkAuthStatus = (): boolean | Observable<boolean> => {
  //se inyectan el AuthService y el Router
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.checkoutAuthentication().pipe(
    tap(isAuthenticated => console.log({ 'Authenticated': isAuthenticated })),
    tap((isAuthenticated) => {
      if (isAuthenticated) {
        router.navigate(['/heroes/list']);
      }
    }),
    map(isAuthenticated => !isAuthenticated)
  );
}

export const canActivatePublicGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return checkAuthStatus();
};

export const canMatchPublicGuard: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
  return checkAuthStatus();
};
