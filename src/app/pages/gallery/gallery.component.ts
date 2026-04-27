import { Component } from '@angular/core';
import { httpResource } from '@angular/common/http';

interface GalleryPhoto {
  src: string;
  caption: string;
}

interface GalleryManifest {
  photos: GalleryPhoto[];
}

const PLACEHOLDERS: GalleryPhoto[] = [
  { src: '', caption: 'фото пространства' },
  { src: '', caption: 'фото мероприятия' },
  { src: '', caption: 'фото атмосферы' },
  { src: '', caption: 'фото людей' },
  { src: '', caption: 'фото библиотеки' },
  { src: '', caption: 'фото игр' },
];

@Component({
  selector: 'app-gallery',
  standalone: true,
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css',
})
export class GalleryComponent {
  photos = httpResource<GalleryManifest>('/assets/gallery/manifest.json');

  get displayPhotos(): GalleryPhoto[] {
    const data = this.photos.value();
    if (!data || data.photos.length === 0) return PLACEHOLDERS;
    return data.photos;
  }

  get isPlaceholder(): boolean {
    const data = this.photos.value();
    return !data || data.photos.length === 0;
  }
}
