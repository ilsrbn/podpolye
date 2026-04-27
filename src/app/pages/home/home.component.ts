import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MarqueeComponent } from '../../shared/marquee/marquee.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, MarqueeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
