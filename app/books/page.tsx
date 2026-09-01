import type { Metadata } from 'next';
import BooksLanding from '../components/BooksLanding';

export const metadata: Metadata = {
  title: 'Books — pointer to grimaldi.ca',
  description: 'Books, manuscripts in revision and the chapter proof-engine repositories live on grimaldi.ca/books. This domain keeps a pointer only.',
  alternates: { canonical: 'https://grimaldi.ca/books' },
};

export const revalidate = 3600;

export default function BooksPage() {
  return <BooksLanding />;
}
