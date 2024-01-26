import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';
// Components
import { ButtonModule } from 'primeng/button';
import { type Menu, MenuModule } from 'primeng/menu';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MenuModule, ButtonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  @Input() items: MenuItem[] = [];
  @Output() openMenu = new EventEmitter();

  onOpenMenu(event: Event, menu: Menu): void {
    this.openMenu.emit();
    event.stopPropagation();
    menu.toggle(event);
  }
}
