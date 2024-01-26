import { Injectable } from '@angular/core';
import { GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { type IResponse } from '@core/interfaces';
import { FirebaseService } from '@core/libs';

@Injectable({
  providedIn: 'root'
})
export class OauthService {
  private googleProvider: GoogleAuthProvider;
  private githubProvider: GithubAuthProvider;

  constructor(private fbService: FirebaseService) {
    this.googleProvider = new GoogleAuthProvider();
    this.githubProvider = new GithubAuthProvider();
  }

  async signInWithGoogle(): Promise<IResponse<null>> {
    try {
      await signInWithPopup(this.fbService.firebaseAuth, this.googleProvider);
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

  async signInWithGithub(): Promise<IResponse<null>> {
    try {
      await signInWithPopup(this.fbService.firebaseAuth, this.githubProvider);
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
