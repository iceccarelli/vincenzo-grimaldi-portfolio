'use client';

/**
 * Stories.tsx — the featured-work carousel (AWS stories pattern) plus the
 * "live on the network" deployments rail. Every card opens a real surface;
 * that invariant lives in app/lib/dynamic.ts, not here.
 */

import Carousel from './Carousel';
import { useLanguage } from '../lib/i18n';
import { deployments, stories, storiesUi } from '../lib/dynamic';

export default function Stories() {
  const { locale } = useLanguage();

  return (
    <>
      {/* Featured stories */}
      <section className="section-shell content-section" id="stories">
        <div className="stories-head">
          <div>
            <span className="section-kicker">{storiesUi.kicker[locale]}</span>
            <h2>{storiesUi.title[locale]}</h2>
            <p className="section-intro">{storiesUi.intro[locale]}</p>
          </div>
        </div>

        <Carousel
          ariaLabel={storiesUi.kicker[locale]}
          prevLabel={storiesUi.prev[locale]}
          nextLabel={storiesUi.next[locale]}
        >
          {stories.map((story) => (
            <a
              key={story.id}
              className="story-card"
              href={story.href}
              {...(story.external ? { target: '_blank', rel: 'noreferrer' } : {})}
              style={{ ['--story-accent' as never]: story.accent }}
            >
              <span className="story-tag">{story.tag[locale]}</span>
              <h3>{story.title[locale]}</h3>
              <p>{story.body[locale]}</p>
              <span className="story-cta">
                {story.cta[locale]} <span aria-hidden>→</span>
              </span>
            </a>
          ))}
        </Carousel>
      </section>

      {/* Live deployments rail */}
      <section className="section-shell content-section" id="live">
        <div className="stories-head">
          <div>
            <span className="section-kicker">{storiesUi.showcaseKicker[locale]}</span>
            <h2>{storiesUi.showcaseTitle[locale]}</h2>
            <p className="section-intro">{storiesUi.showcaseIntro[locale]}</p>
          </div>
        </div>

        <Carousel
          ariaLabel={storiesUi.showcaseKicker[locale]}
          prevLabel={storiesUi.prev[locale]}
          nextLabel={storiesUi.next[locale]}
        >
          {deployments.map((deployment) => (
            <a
              key={deployment.id}
              className="deploy-card"
              href={deployment.href}
              {...(deployment.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
            >
              <span className="deploy-live">
                <span className="live-dot" /> {storiesUi.liveBadge[locale]}
              </span>
              <h3>{deployment.title[locale]}</h3>
              <p>{deployment.desc[locale]}</p>
              <span className="deploy-host">{deployment.host}</span>
            </a>
          ))}
        </Carousel>
      </section>
    </>
  );
}
