import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SITE_CONFIG } from '../config/site.config';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  readonly site = SITE_CONFIG;
  mobileMenuOpen = signal(false);

  toggleMenu() {
    this.mobileMenuOpen.update(v => !v);
    document.body.style.overflow = this.mobileMenuOpen() ? 'hidden' : '';
  }

  closeMenu() {
    this.mobileMenuOpen.set(false);
    document.body.style.overflow = '';
  }
}
