import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  if (typeof window !== 'undefined' && !!localStorage.getItem('tokenInter')) {
    return true;
  }
  else {
    router.navigate(['/auth']);
    return false;
  }
};