/**
 * site.ts — single source of truth for identity and canonical URLs.
 * Every schema node, metadata block and link reads from here.
 *
 * This host carries no commercial offer. There is no price, no checkout,
 * no booking widget anywhere in this module or in anything that imports it.
 */

export const SITE_URL = 'https://igrimaldi.engineering';

/** Display name = legal name on this host. The H1 and <title> use it. */
export const SITE_NAME = 'Vincenzo Ceccarelli Grimaldi';
export const LEGAL_NAME = 'Vincenzo Ceccarelli Grimaldi';
export const SHORT_NAME = 'Vincenzo Grimaldi';

export const EMAIL = 'vincenzo@igrimaldi.engineering';
export const CITY = 'Frankfurt am Main';

/** One line. Discipline, not a job advert. */
export const ONE_LINE = 'Physics-constrained control · grid digitalisation';
export const ONE_LINE_DE = 'Physikalisch beschränkte Regelung · Netzdigitalisierung';

/** Public role, as it appears on the profile. No internals. */
export const ROLE_TITLE = 'ITk Fachspezialist';
export const EMPLOYER = 'DB InfraGO AG';

export const JOB_TITLE = 'Engineer — physics-constrained control and grid digitalisation';
export const HEADSHOT = `${SITE_URL}/vincenzo_grimaldi_headshot.jpg`;

export const GITHUB = 'https://github.com/iceccarelli';
export const LINKEDIN = 'https://www.linkedin.com/in/vincenzo-ceccarelli-grimaldi-2912b42a0';
export const THESIS_DEMO = 'https://physics-informed.vercel.app/';

export const SAME_AS = [
  GITHUB,
  LINKEDIN,
  THESIS_DEMO,
  'https://engineeringgrimaldi.com/',
  'https://grimaldi.ca/',
];

/** Employer-conflict disclosure. Renders in the footer and /impressum. */
export const CONFLICT_EN =
  'Everything on this site is independent of, and outside the scope of, my role at DB InfraGO AG. No employer data, systems or confidential information are used or described.';
export const CONFLICT_DE =
  'Alle Inhalte dieser Website sind unabhängig von meiner Tätigkeit bei der DB InfraGO AG und liegen außerhalb ihres Umfangs. Es werden keine Daten, Systeme oder vertraulichen Informationen des Arbeitgebers verwendet oder beschrieben.';
