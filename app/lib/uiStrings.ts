import type { Locale } from './i18n';

/**
 * uiStrings.ts — strings added by the hardening pass, kept OUT of the
 * monolithic Dictionary in i18n.tsx so the typed dictionary does not need
 * a 4-locale structural migration. Fold into i18n.tsx at the next
 * dictionary refactor (P2).
 */

type Extra = {
  navWork: string;
  ctaBook: string;
  ctaWork: string;
  bookBar: string;
  consentText: string;
  consentAccept: string;
  consentDecline: string;
  imprint: string;
  privacy: string;
  notFoundTitle: string;
  notFoundBody: string;
  notFoundCta: string;
};

export const extra: Record<Locale, Extra> = {
  en: {
    navWork: 'Work',
    ctaBook: 'Book a €280 teardown',
    ctaWork: 'See the work',
    bookBar: 'Book a 60-min teardown — €280',
    consentText:
      'This site uses cookieless Vercel Analytics to count visits. No personal profiles, no ads.',
    consentAccept: 'Allow',
    consentDecline: 'Decline',
    imprint: 'Impressum',
    privacy: 'Datenschutz',
    notFoundTitle: 'Page not found',
    notFoundBody: 'That URL does not exist. The work registry and contact routes below do.',
    notFoundCta: 'Back to the homepage',
  },
  es: {
    navWork: 'Proyectos',
    ctaBook: 'Reservar teardown de 280 €',
    ctaWork: 'Ver los proyectos',
    bookBar: 'Reservar teardown de 60 min — 280 €',
    consentText:
      'Este sitio usa Vercel Analytics sin cookies para contar visitas. Sin perfiles personales ni publicidad.',
    consentAccept: 'Permitir',
    consentDecline: 'Rechazar',
    imprint: 'Aviso legal (Impressum)',
    privacy: 'Privacidad (Datenschutz)',
    notFoundTitle: 'Página no encontrada',
    notFoundBody: 'Esa URL no existe. El registro de proyectos y el contacto sí.',
    notFoundCta: 'Volver a la página principal',
  },
  de: {
    navWork: 'Projekte',
    ctaBook: '€280-Teardown buchen',
    ctaWork: 'Projekte ansehen',
    bookBar: '60-Min-Teardown buchen — 280 €',
    consentText:
      'Diese Seite nutzt cookieloses Vercel Analytics zur Besucherzählung. Keine Profile, keine Werbung.',
    consentAccept: 'Erlauben',
    consentDecline: 'Ablehnen',
    imprint: 'Impressum',
    privacy: 'Datenschutz',
    notFoundTitle: 'Seite nicht gefunden',
    notFoundBody: 'Diese URL existiert nicht. Projektregister und Kontakt schon.',
    notFoundCta: 'Zurück zur Startseite',
  },
  zh: {
    navWork: '项目',
    ctaBook: '预约 €280 拆解评审',
    ctaWork: '查看项目',
    bookBar: '预约 60 分钟拆解评审 — €280',
    consentText: '本站使用无 Cookie 的 Vercel Analytics 统计访问量。不建立个人画像，无广告。',
    consentAccept: '允许',
    consentDecline: '拒绝',
    imprint: '版本说明 (Impressum)',
    privacy: '隐私政策 (Datenschutz)',
    notFoundTitle: '页面不存在',
    notFoundBody: '该地址不存在。项目列表与联系方式如下。',
    notFoundCta: '返回首页',
  },
};
