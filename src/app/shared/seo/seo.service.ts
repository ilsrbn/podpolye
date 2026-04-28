import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { SITE_CONFIG } from '../config/site.config';

interface RouteSeoData {
  title?: string;
  description?: string;
  image?: string;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);
  private readonly router = inject(Router);

  init(): void {
    this.applyCurrentRoute();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) this.applyCurrentRoute();
    });
  }

  private applyCurrentRoute(): void {
    const data = this.getRouteSeo(this.router.routerState.snapshot.root);
    const title = data.title ?? SITE_CONFIG.title;
    const description = data.description ?? SITE_CONFIG.description;
    const image = this.absoluteUrl(data.image ?? SITE_CONFIG.image);
    const url = this.absoluteUrl(this.router.url.split('#')[0].split('?')[0] || '/');

    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:locale', content: SITE_CONFIG.locale });
    this.meta.updateTag({ property: 'og:site_name', content: SITE_CONFIG.name });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: image });
  }

  private getRouteSeo(route: ActivatedRouteSnapshot): RouteSeoData {
    let current = route;
    while (current.firstChild) current = current.firstChild;
    return (current.data['seo'] as RouteSeoData | undefined) ?? {};
  }

  private absoluteUrl(path: string): string {
    if (/^https?:\/\//.test(path)) return path;
    return `${SITE_CONFIG.url}${path.startsWith('/') ? path : `/${path}`}`;
  }
}
