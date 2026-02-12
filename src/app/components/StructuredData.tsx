import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://datumgeek.github.io/linda-graham-studio';

/** Person + ArtGallery structured data for search engines */
const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Linda Graham',
  url: SITE_URL,
  jobTitle: 'Artist',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Denver',
    addressRegion: 'CO',
    addressCountry: 'US',
  },
  knowsAbout: [
    'Ceramic sculpture',
    'Clay work',
    'Light installations',
    'Plexiglass art',
    'Projection art',
  ],
  sameAs: [],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Linda Graham Studio',
  url: SITE_URL,
  description:
    'Artist portfolio of Linda Graham — clay, plexiglass, light, and projection installations.',
  author: personSchema,
};

export function StructuredData() {
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(personSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
    </Helmet>
  );
}

interface ArtworkSchemaProps {
  name: string;
  description?: string;
  image?: string;
  dateCreated?: number;
  artMedium?: string;
  url?: string;
}

/** Per-artwork VisualArtwork JSON-LD */
export function ArtworkStructuredData({
  name,
  description,
  image,
  dateCreated,
  artMedium,
  url,
}: ArtworkSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'VisualArtwork',
    name,
    ...(description && { description }),
    ...(image && { image }),
    ...(dateCreated && { dateCreated: String(dateCreated) }),
    ...(artMedium && { artMedium }),
    ...(url && { url }),
    creator: {
      '@type': 'Person',
      name: 'Linda Graham',
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}
