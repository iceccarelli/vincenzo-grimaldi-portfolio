import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import DomainNav from '../../components/DomainNav';
import Plate from '../../components/Plate';
import { ArticleJsonLd } from '../../components/JsonLd';
import { articles, getArticle } from '../../lib/electrical';
import { SITE_URL } from '../../lib/site';

type Props = { params: { slug: string } };

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const a = getArticle(params.slug);
  if (!a) return {};
  return {
    title: a.title,
    description: a.summary,
    alternates: { canonical: '/articles/' + a.slug },
    openGraph: {
      title: a.title,
      description: a.summary,
      url: SITE_URL + '/articles/' + a.slug,
      type: 'article',
      publishedTime: a.date,
      images: [{ url: SITE_URL + a.heroImage, width: 1168, height: 784, alt: a.heroAlt }],
    },
  };
}

export default function ArticlePage({ params }: Props) {
  const a = getArticle(params.slug);
  if (!a) notFound();

  return (
    <main className="doc">
      <DomainNav current="/articles" />

      <article className="blk blk-first">
        <p className="kicker">
          <Link href="/articles">← Articles</Link> · {a.readingTime} ·{' '}
          <time dateTime={a.date}>{a.date}</time>
        </p>
        <h1 className="h1">{a.title}</h1>
        <p className="lead">{a.summary}</p>

        <Plate
          src={a.heroImage}
          alt={a.heroAlt}
          code={a.heroCode}
          caption={a.heroCaption}
          priority
        />

        {a.sections.map((sec, idx) => (
          <section key={sec.heading} className="blk">
            <h2 className="blk-h">{sec.heading}</h2>
            {sec.paragraphs.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
            {idx === 0 && (
              <Plate
                src={a.secondaryImage}
                alt={a.secondaryAlt}
                code={a.secondaryCode}
                caption={a.secondaryCaption}
              />
            )}
            {idx === 1 && a.tertiaryImage && a.tertiaryAlt && (
              <Plate
                src={a.tertiaryImage}
                alt={a.tertiaryAlt}
                code={a.tertiaryCode}
                caption={a.tertiaryCaption}
              />
            )}
          </section>
        ))}

        <p className="tags">
          {a.tags.map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </p>
      </article>

      <ArticleJsonLd
        headline={a.title}
        description={a.summary}
        url={SITE_URL + '/articles/' + a.slug}
        image={SITE_URL + a.heroImage}
        datePublished={a.date}
      />
    </main>
  );
}
