import { Component, signal, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs/operators';
import { SITE_CONFIG } from '../config/site.config';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  private router = inject(Router);

  readonly site = SITE_CONFIG;
  mobileMenuOpen = signal(false);

  readonly navEvents = toSignal(
    this.router.events.pipe(filter(e => e instanceof NavigationEnd))
  );

  toggleMenu() {
    this.mobileMenuOpen.update(v => !v);
    document.body.style.overflow = this.mobileMenuOpen() ? 'hidden' : '';
  }

  closeMenu() {
    this.mobileMenuOpen.set(false);
    document.body.style.overflow = '';
  }

  isActive(path: string): boolean {
    return path === '/'
      ? this.router.url === '/'
      : this.router.url.startsWith(path);
  }

  async navigateFromMenu(path: string, event: Event) {
    event.preventDefault();

    if (this.router.url === path) {
      this.closeMenu();
      return;
    }

    try {
      await this.router.navigateByUrl(path);
    } finally {
      this.closeMenu();
    }
  }
}
