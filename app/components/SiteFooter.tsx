'use client';

import SocialBar from './SocialBar';
import BrandMark from './BrandMark';
import { useLanguage } from '../lib/i18n';

/**
 * AWS-style dark columnar footer, fully localised: CTA topline, four link
 * columns, back-to-top, legal bar with social icons. Client component so
 * every string follows the active locale.
 */
export default function SiteFooter() {
  const { t } = useLanguage();

  return (
    <footer className="site-footer">
      <div className="section-shell">
        <div className="footer-topline">
          <a className="footer-cta" href="#connect">
            {t.footer.cta}
          </a>
        </div>

        <div className="footer-content">
          {/* Column 1 – Entity */}
          <div className="footer-column">
            <div className="brand-lockup" style={{ marginBottom: '1rem' }}>
              <BrandMark size={42} />
              <span className="brand-copy"><strong style={{ color: '#ffffff' }}>Vincenzo Grimaldi</strong></span>
            </div>
            <p style={{ lineHeight: 1.6, fontSize: '0.9rem' }}>
              {t.footer.role}
              <br />
              {t.footer.roleSub}
            </p>
          </div>

          {/* Column 2 – Platform */}
          <div className="footer-column">
            <h4>{t.footer.platform}</h4>
            <div className="footer-links">
              <a className="footer-link" href="#capabilities">{t.nav.capabilities}</a>
              <a className="footer-link" href="#registry">{t.footer.workRegistry}</a>
              <a className="footer-link" href="#physics-informed">{t.footer.physicsInformed}</a>
              <a className="footer-link" href="https://physics-informed.vercel.app/" target="_blank" rel="noopener noreferrer">{t.footer.liveSimulator}</a>
              <a className="footer-link" href="#payments">{t.nav.payments}</a>
              <a className="footer-link" href="#connect">{t.nav.connect}</a>
              <a className="footer-link" href="/card">{t.card.kicker}</a>
            </div>
          </div>

          {/* Column 3 – The Grimaldi Network */}
          <div className="footer-column">
            <h4>{t.footer.network}</h4>
            <div className="footer-links">
              <a className="footer-link" href="https://igrimaldi.engineering">igrimaldi.engineering — {t.footer.netSoftware}</a>
              <a className="footer-link" href="https://engineeringgrimaldi.com" target="_blank" rel="noopener noreferrer">engineeringgrimaldi.com — {t.footer.netHardware}</a>
              <a className="footer-link" href="https://grimaldi.ca" target="_blank" rel="noopener noreferrer">grimaldi.ca — {t.footer.netPersonal}</a>
              <a className="footer-link" href="https://github.com/iceccarelli" target="_blank" rel="noopener noreferrer">GitHub — iceccarelli</a>
            </div>
          </div>

          {/* Column 4 – Status */}
          <div className="footer-column">
            <h4>{t.footer.status}</h4>
            <div className="footer-status" style={{ marginBottom: '1rem' }}>
              <span className="live-dot" />
              <span>{t.footer.available}</span>
            </div>
            <p style={{ fontSize: '0.88rem', lineHeight: 1.55 }}>{t.footer.europe}</p>
            <a className="footer-link" href="mailto:vincenzo@igrimaldi.engineering" style={{ marginTop: '0.75rem', display: 'inline-block' }}>
              vincenzo@igrimaldi.engineering →
            </a>
          </div>
        </div>

        <div className="footer-backtotop">
          <a href="#top">{t.footer.backToTop}</a>
        </div>

        <div className="footer-legal">
          <span>{t.footer.rights}</span>
          <SocialBar />
        </div>
      </div>
    </footer>
  );
}
