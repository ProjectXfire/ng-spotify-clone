import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth, signOut, type Auth } from 'firebase/auth';
import { type Firestore, getFirestore } from 'firebase/firestore/lite';
import { type IResponse } from 'src/core/interfaces';
import { environment as envDev } from 'src/environments/environment.development';
import { environment as envProd } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private auth: Auth;
  private db: Firestore;

  constructor() {
    const app = initializeApp(envDev.firebaseConfig);
    this.auth = getAuth(app);
    this.db = getFirestore(app);
  }
  get firebaseAuth() {
    return this.auth;
  }

  get firebaseDb() {
    return this.db;
  }
}
