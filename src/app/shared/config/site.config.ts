export const SITE_CONFIG = {
  name: 'ПОДПОЛЬЕ',
  title: 'ПОДПОЛЬЕ — Одесса',
  description: 'Некоммерческое городское пространство для интеллектуального отдыха, развития и работы. Антикафе, коворкинг и мероприятия в Одессе на Канатной, 79.',
  url: 'https://podpolye.org',
  locale: 'ru_UA',
  image: '/assets/images/arc_2.webp',
  address: 'Канатная, 79, Одесса',
  prices: {
    coworkingHour: 50,
    eventHour: 200,
  },
  socials: {
    telegram: 'https://t.me/de_profundis_clamavi',
    instagram: 'https://www.instagram.com/podpolie.odessa/',
    developerTelegram: 'https://t.me/ilsrbn',
  },
} as const;

export type SiteConfig = typeof SITE_CONFIG;
