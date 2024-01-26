import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { onAuthStateChanged } from 'firebase/auth';
import { FirebaseService } from 'src/core/libs';

export const authenticationGuard: CanActivateFn = (route, state) => {
  const auth = inject(FirebaseService).firebaseAuth;
  const router = inject(Router);
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(true);
      } else {
        router.navigate(['/auth/signin']);
        resolve(false);
      }
    });
  });
};
