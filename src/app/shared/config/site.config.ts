export const SITE_CONFIG = {
  name: 'ПІДПІЛЛЯ',
  title: 'ПІДПІЛЛЯ — Одеса',
  description: 'Некомерційний міський простір для інтелектуального відпочинку, розвитку та роботи. Антикафе, коворкінг і події в Одесі на Канатній, 79.',
  url: 'https://podpolye.org',
  locale: 'uk_UA',
  image: '/assets/images/arc_2.webp',
  address: 'Канатна, 79, Одеса',
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
