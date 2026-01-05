import fs from 'fs';
import path from 'path';
import { PortfolioItem, PortfolioListItem } from '@/types/portfolio';

const portfoliosDirectory = path.join(process.cwd(), 'data/portfolios');

export function getAllPortfolios(): PortfolioListItem[] {
  const fileNames = fs.readdirSync(portfoliosDirectory);

  const portfolios = fileNames
    .filter((fileName) => fileName.endsWith('.json') && !fileName.startsWith('_'))
    .map((fileName) => {
      const fullPath = path.join(portfoliosDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const data = JSON.parse(fileContents) as PortfolioItem;

      return {
        slug: data.slug,
        title: data.title,
        location: data.location,
        buildingType: data.buildingType,
        product: data.product,
        rating: data.rating,
        date: data.date,
        thumbnail: data.images.thumbnail,
        published: data.published,
        order: data.order,
      };
    })
    .filter((item) => item.published)
    .sort((a, b) => a.order - b.order);

  return portfolios;
}

export function getPortfolioBySlug(slug: string): PortfolioItem | null {
  try {
    const fullPath = path.join(portfoliosDirectory, `${slug}.json`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const data = JSON.parse(fileContents) as PortfolioItem;

    if (!data.published) {
      return null;
    }

    return data;
  } catch {
    return null;
  }
}

export function getAllPortfolioSlugs(): string[] {
  const fileNames = fs.readdirSync(portfoliosDirectory);

  return fileNames
    .filter((fileName) => fileName.endsWith('.json') && !fileName.startsWith('_'))
    .map((fileName) => {
      const fullPath = path.join(portfoliosDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const data = JSON.parse(fileContents) as PortfolioItem;
      return data.published ? data.slug : null;
    })
    .filter((slug): slug is string => slug !== null);
}
