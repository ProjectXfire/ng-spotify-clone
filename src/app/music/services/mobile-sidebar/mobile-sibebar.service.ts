import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MobileSibebarService {
  constructor() {}

  isOpen = signal<boolean>(false);

  openSidebar() {
    this.isOpen.update((cv) => (cv = true));
  }

  closeSidebar() {
    this.isOpen.update((cv) => (cv = false));
  }
}
