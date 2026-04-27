import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    data: {
      seo: {
        title: 'ПОДПОЛЬЕ — антикафе, коворкинг и мероприятия в Одессе',
        description: 'Некоммерческое городское пространство на Канатной, 79: антикафе, коворкинг, мероприятия, чай, кофе, книги и настольные игры.',
      },
    },
  },
  {
    path: 'gallery',
    loadComponent: () => import('./pages/gallery/gallery.component').then(m => m.GalleryComponent),
    data: {
      seo: {
        title: 'Галерея — ПОДПОЛЬЕ Одесса',
        description: 'Фотографии пространства ПОДПОЛЬЕ: интерьер, мероприятия, атмосфера и люди.',
      },
    },
  },
  {
    path: 'rules',
    loadComponent: () => import('./pages/rules/rules.component').then(m => m.RulesComponent),
    data: {
      seo: {
        title: 'Правила — ПОДПОЛЬЕ Одесса',
        description: 'Правила посещения пространства ПОДПОЛЬЕ: трезвость, уважение, нейтралитет, чистота и комфорт для всех.',
      },
    },
  },
  {
    path: 'contacts',
    loadComponent: () => import('./pages/contacts/contacts.component').then(m => m.ContactsComponent),
    data: {
      seo: {
        title: 'Контакты — ПОДПОЛЬЕ Одесса',
        description: 'Адрес, контакты координаторов, социальные сети и карта пространства ПОДПОЛЬЕ на Канатной, 79 в Одессе.',
      },
    },
  },
  {
    path: '**',
    redirectTo: '',
  },
];
