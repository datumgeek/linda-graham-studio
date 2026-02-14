import exhibitionsJson from './exhibitions.json';
import workingWithClayJson from './working-with-clay.json';

export interface PortfolioImage {
  imageCaption?: string;
  videoCaption?: string;
  imageSmall: string;
  imageLarge?: string;
  videoLarge?: string;
}

export interface Portfolio {
  portfolio: string;
  portfolioName: string;
  portfolioImage: string;
  description: PortfolioDescription;
  images: PortfolioImage[];
}

export interface PortfolioDescription {
  title: string;
  venue?: string;
  location?: string;
  year?: number;
  medium?: string;
  artistStatement?: string;
  curatorNote?: { text: string; author: string };
  collaborator?: string;
  paragraphs: string[];
  /** Curated color palette extracted from representative artwork */
  palette?: string[];
}

export type PortfolioListName = 'exhibitions' | 'workingWithClay';

export const portfolioListLabels: Record<PortfolioListName, string> = {
  exhibitions: 'Exhibitions',
  workingWithClay: 'Working with Clay',
};

export const portfolios: Record<PortfolioListName, Portfolio[]> = {
  exhibitions: exhibitionsJson as Portfolio[],
  workingWithClay: workingWithClayJson as Portfolio[],
};

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

export function getImageUrl(
  listName: PortfolioListName,
  portfolioKey: string,
  filename: string,
): string {
  return `${BASE}/images/${listName}/${portfolioKey}/${filename}`;
}

export function getPortfolioThumbUrl(
  listName: PortfolioListName,
  portfolioKey: string,
  filename: string,
): string {
  return `${BASE}/images/${listName}/${portfolioKey}/${filename}`;
}

/** Convert a filename to its WebP variant */
export function toWebp(filename: string): string {
  return filename.replace(/\.(jpe?g|png)$/i, '.webp');
}

/** Build a srcset string with responsive WebP widths */
export function getResponsiveSrcSet(
  listName: PortfolioListName,
  portfolioKey: string,
  filename: string,
): string {
  const base = `${BASE}/images/${listName}/${portfolioKey}`;
  const stem = filename.replace(/\.(jpe?g|png)$/i, '');
  return [320, 640, 1024]
    .map((w) => `${base}/${stem}-${w}w.webp ${w}w`)
    .join(', ');
}

export function findPortfolio(
  listName: PortfolioListName,
  portfolioKey: string,
): Portfolio | undefined {
  return portfolios[listName]?.find((p) => p.portfolio === portfolioKey);
}
