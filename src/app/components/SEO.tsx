import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'Linda Graham Studio';
const SITE_URL = 'https://datumgeek.github.io/linda-graham-studio';
const DEFAULT_DESCRIPTION =
  'Artist portfolio of Linda Graham — clay, plexiglass, light, and projection installations in Denver, Colorado.';
const DEFAULT_IMAGE = `${SITE_URL}/images/IllusiveReality-1024x682.jpg`;

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  path?: string;
  type?: 'website' | 'article';
}

export function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_IMAGE,
  path = '',
  type = 'website',
}: SEOProps) {
  const pageTitle = title ? `${title} — ${SITE_NAME}` : SITE_NAME;
  const url = `${SITE_URL}${path}`;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={SITE_NAME} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
