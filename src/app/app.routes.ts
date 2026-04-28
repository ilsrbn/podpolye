import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    data: {
      seo: {
        title: 'ПІДПІЛЛЯ — антикафе, коворкінг і події в Одесі',
        description: 'Некомерційний міський простір на Канатній, 79: антикафе, коворкінг, події, чай, кава, книжки та настільні ігри.',
      },
    },
  },
  {
    path: 'gallery',
    loadComponent: () => import('./pages/gallery/gallery.component').then(m => m.GalleryComponent),
    data: {
      seo: {
        title: 'Галерея — ПІДПІЛЛЯ Одеса',
        description: 'Фотографії простору ПІДПІЛЛЯ: інтерʼєр, події, атмосфера та люди.',
      },
    },
  },
  {
    path: 'rules',
    loadComponent: () => import('./pages/rules/rules.component').then(m => m.RulesComponent),
    data: {
      seo: {
        title: 'Правила — ПІДПІЛЛЯ Одеса',
        description: 'Правила відвідування простору ПІДПІЛЛЯ: тверезість, повага, нейтралітет, чистота й комфорт для всіх.',
      },
    },
  },
  {
    path: 'contacts',
    loadComponent: () => import('./pages/contacts/contacts.component').then(m => m.ContactsComponent),
    data: {
      seo: {
        title: 'Контакти — ПІДПІЛЛЯ Одеса',
        description: 'Адреса, контакти координаторів, соціальні мережі та карта простору ПІДПІЛЛЯ на Канатній, 79 в Одесі.',
      },
    },
  },
  {
    path: '**',
    redirectTo: '',
  },
];
