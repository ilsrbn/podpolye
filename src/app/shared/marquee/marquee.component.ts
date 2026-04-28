import { Component } from '@angular/core';

@Component({
  selector: 'app-marquee',
  standalone: true,
  templateUrl: './marquee.component.html',
  styleUrl: './marquee.component.css',
})
export class MarqueeComponent {
  readonly items = [
    'Коворкінг',
    'Події',
    'Одеса',
    'Канатна 79',
    'Free Donation',
    'Антикафе',
  ];

  readonly copies = [0, 1];
}
