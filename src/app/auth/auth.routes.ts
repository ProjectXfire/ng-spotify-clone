import { Routes } from '@angular/router';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';

export const authRoutes: Routes = [
  { path: 'signin', title: 'Sign In', component: SigninComponent },
  { path: 'signup', title: 'Sign Up', component: SignupComponent },
  { path: '**', redirectTo: 'signin' }
];
