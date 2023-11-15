import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { TokenService } from '../services/token.service';
import { inject } from '@angular/core';

export const authGuardGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const tokenService = inject(TokenService); 
  const router = inject(Router);
  const isLoggedIn = tokenService.getToken();
  if (isLoggedIn) {
    return true;
  }
  else {
    router.navigate(['/sign-in']);
    return false;
  }
  
};
