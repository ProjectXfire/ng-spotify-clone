import { Routes } from '@angular/router';
// Pages
import { HomeComponent } from './music/pages/home/home.component';
import { AuthComponent } from './auth/pages/auth/auth.component';
// Guard
import { authenticationGuard } from 'src/core/guards';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    loadChildren: () => import('./auth/auth.routes').then((m) => m.authRoutes)
  },
  {
    path: '',
    title: 'Home',
    component: HomeComponent,
    canActivate: [authenticationGuard],
    loadChildren: () => import('./music/music.routes').then((m) => m.musicRoutes)
  }
];
