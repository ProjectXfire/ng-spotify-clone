import { Routes } from '@angular/router';
import {
  SearchComponent,
  TracksComponent,
  YourLibraryComponent,
  FavoritesComponent,
  PlaylistComponent
} from './pages';

export const musicRoutes: Routes = [
  { path: '', title: 'Tracks', component: TracksComponent },
  { path: 'your-library', title: 'Your Library', component: YourLibraryComponent },
  { path: 'search', title: 'Search', component: SearchComponent },
  { path: 'favorites', title: 'My Favorites', component: FavoritesComponent },
  { path: 'playlist/:id', title: 'Playlist', component: PlaylistComponent },
  { path: '**', redirectTo: '' }
];
