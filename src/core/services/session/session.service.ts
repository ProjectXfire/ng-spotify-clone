import { Injectable } from '@angular/core';
import { signOut } from 'firebase/auth';
import { FirebaseService } from '@core/libs';
import { type IResponse } from '@core/interfaces';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  constructor(private fbService: FirebaseService) {}

  get session() {
    const user = this.fbService.firebaseAuth.currentUser;
    return user;
  }

  async closeSession(): Promise<IResponse<null>> {
    try {
      await signOut(this.fbService.firebaseAuth);
      return {
        data: null,
        error: null,
        successfulMessage: 'Session close successful'
      };
    } catch (error) {
      return {
        data: null,
        error: 'Error on close session',
        successfulMessage: null
      };
    }
  }
}
