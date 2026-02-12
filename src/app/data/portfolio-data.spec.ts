import { describe, it, expect } from 'vitest';
import {
  portfolios,
  portfolioListLabels,
  findPortfolio,
  getImageUrl,
  getPortfolioThumbUrl,
} from './portfolio-data';

describe('portfolio-data', () => {
  describe('portfolios', () => {
    it('should have exhibitions and workingWithClay categories', () => {
      expect(Object.keys(portfolios)).toEqual(['exhibitions', 'workingWithClay']);
    });

    it('should have at least one portfolio in each category', () => {
      expect(portfolios.exhibitions.length).toBeGreaterThan(0);
      expect(portfolios.workingWithClay.length).toBeGreaterThan(0);
    });

    it('each portfolio should have required fields', () => {
      for (const list of Object.values(portfolios)) {
        for (const p of list) {
          expect(p.portfolio).toBeTruthy();
          expect(p.portfolioName).toBeTruthy();
          expect(p.portfolioImage).toBeTruthy();
          expect(p.description).toBeDefined();
          expect(p.description.title).toBeTruthy();
          expect(Array.isArray(p.images)).toBe(true);
        }
      }
    });

    it('each image should have imageSmall', () => {
      for (const list of Object.values(portfolios)) {
        for (const p of list) {
          for (const img of p.images) {
            expect(img.imageSmall).toBeTruthy();
            // Should have either imageLarge or videoLarge
            expect(img.imageLarge || img.videoLarge).toBeTruthy();
          }
        }
      }
    });
  });

  describe('portfolioListLabels', () => {
    it('should have labels for both categories', () => {
      expect(portfolioListLabels.exhibitions).toBe('Exhibitions');
      expect(portfolioListLabels.workingWithClay).toBe('Working with Clay');
    });
  });

  describe('findPortfolio', () => {
    it('should find a portfolio by key', () => {
      const result = findPortfolio('exhibitions', 'naturalSelection');
      expect(result).toBeDefined();
      expect(result?.portfolioName).toBe('NATURAL SELECTION');
    });

    it('should return undefined for invalid key', () => {
      expect(findPortfolio('exhibitions', 'nonexistent')).toBeUndefined();
    });

    it('should return undefined for invalid list', () => {
      expect(findPortfolio('invalid' as any, 'naturalSelection')).toBeUndefined();
    });
  });

  describe('getImageUrl', () => {
    it('should construct correct image URL', () => {
      const url = getImageUrl('exhibitions', 'naturalSelection', 'test.jpg');
      expect(url).toContain('/images/exhibitions/naturalSelection/test.jpg');
    });
  });

  describe('getPortfolioThumbUrl', () => {
    it('should construct correct thumbnail URL', () => {
      const url = getPortfolioThumbUrl('workingWithClay', 'earlyWorks', 'thumb.jpg');
      expect(url).toContain('/images/workingWithClay/earlyWorks/thumb.jpg');
    });
  });

  describe('enriched data model', () => {
    it('Natural Selection should have structured metadata', () => {
      const ns = findPortfolio('exhibitions', 'naturalSelection');
      expect(ns?.description.venue).toBeTruthy();
      expect(ns?.description.location).toBe('Denver International Airport');
      expect(ns?.description.year).toBe(2010);
      expect(ns?.description.medium).toBeTruthy();
      expect(ns?.description.artistStatement).toBeTruthy();
    });

    it('Multiverse 3 should have curator note', () => {
      const mv = findPortfolio('exhibitions', 'multiverse3');
      expect(mv?.description.curatorNote).toBeDefined();
      expect(mv?.description.curatorNote?.author).toBe('Cortney Stell');
    });

    it('Binaries should have collaborator', () => {
      const b = findPortfolio('exhibitions', 'binaries');
      expect(b?.description.collaborator).toBe('S. Fletcher Graham');
    });
  });
});
