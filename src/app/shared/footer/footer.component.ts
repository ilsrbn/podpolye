import { Component, signal } from '@angular/core';
import { SITE_CONFIG } from '../config/site.config';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  readonly site = SITE_CONFIG;
  readonly currentYear = signal(new Date().getFullYear());
}
