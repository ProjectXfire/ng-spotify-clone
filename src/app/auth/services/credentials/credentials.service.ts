import { Injectable } from '@angular/core';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { FirebaseService } from '@core/libs';
import { type ISignUpUserDto, type ISignInUserDto } from '@app/auth/dtos';
import { type IResponse } from '@core/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CredentialsService {
  constructor(private fbService: FirebaseService) {}

  async signUpWithCredentials(payload: ISignUpUserDto): Promise<IResponse<null>> {
    const { email, password, displayName } = payload;
    try {
      await createUserWithEmailAndPassword(this.fbService.firebaseAuth, email, password);
      const currentUser = this.fbService.firebaseAuth.currentUser;
      if (!currentUser) throw new Error('Failed to update username');
      await updateProfile(currentUser, { displayName });
      return {
        data: null,
        error: null,
        successfulMessage: 'Account sucessfully created'
      };
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        return {
          data: null,
          error: 'Email already exist, please choose another one',
          successfulMessage: null
        };
      }
      return {
        data: null,
        error: error.message,
        successfulMessage: null
      };
    }
  }

  async signInWithCredentials(payload: ISignInUserDto): Promise<IResponse<null>> {
    const { email, password } = payload;
    try {
      await signInWithEmailAndPassword(this.fbService.firebaseAuth, email, password);
      return {
        data: null,
        error: null,
        successfulMessage: 'Successfully login'
      };
    } catch (error: any) {
      if (error.code === 'auth/invalid-credential')
        return {
          data: null,
          error: 'Invalid user or password',
          successfulMessage: null
        };
      return {
        data: null,
        error: 'Something went wrong!',
        successfulMessage: null
      };
    }
  }
}
