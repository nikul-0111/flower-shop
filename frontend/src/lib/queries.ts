import { sanityClient, MOCK_FLOWERS, urlFor } from './sanity';
import type { Flower } from '../types/flower';

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID || 'k71savps';
const isSanityConfigured = !!(projectId && projectId !== 'dummy-project-id');

export async function getAllFlowers(): Promise<Flower[]> {
  if (!isSanityConfigured) {
    return MOCK_FLOWERS;
  }
  try {
    const query = `*[_type == "flower"] | order(createdAt desc) {
      _id,
      name,
      slug,
      description,
      image,
      price,
      oldPrice,
      category,
      featured,
      bestSeller,
      stock,
      colors,
      flowerType,
      careInstructions,
      deliveryInformation,
      createdAt
    }`;
    const rawData = await sanityClient.fetch(query);
    if (!rawData || rawData.length === 0) return MOCK_FLOWERS;
    return rawData.map((item: any) => ({
      ...item,
      image: item.image ? urlFor(item.image) : MOCK_FLOWERS[0].image,
    }));
  } catch (err) {
    console.warn('Sanity fetch error, falling back to mock dataset:', err);
    return MOCK_FLOWERS;
  }
}

export async function getFeaturedFlowers(): Promise<Flower[]> {
  const flowers = await getAllFlowers();
  const featured = flowers.filter((f) => f.featured);
  return featured.length > 0 ? featured : flowers.slice(0, 4);
}

export async function getBestSellerFlowers(): Promise<Flower[]> {
  const flowers = await getAllFlowers();
  const bestSellers = flowers.filter((f) => f.bestSeller);
  return bestSellers.length > 0 ? bestSellers : flowers.slice(0, 4);
}

export async function getFlowerBySlug(slug: string): Promise<Flower | undefined> {
  const flowers = await getAllFlowers();
  return flowers.find((f) => {
    const flowerSlug = typeof f.slug === 'string' ? f.slug : f.slug?.current;
    return flowerSlug === slug;
  });
}

export async function getFlowersByCategory(category: string): Promise<Flower[]> {
  const flowers = await getAllFlowers();
  if (!category || category === 'all') return flowers;
  return flowers.filter((f) => f.category.toLowerCase() === category.toLowerCase());
}

export async function getHeroData() {
  if (!isSanityConfigured) return null;
  try {
    const query = `*[_type == "hero"] | order(_createdAt desc)[0]{ heading, subheading, badge, image, ctaText, ctaLink }`;
    const data = await sanityClient.fetch(query);
    if (!data) return null;
    return {
      ...data,
      imageUrl: data.image ? urlFor(data.image) : null,
    };
  } catch {
    return null;
  }
}

export async function getAnnouncementData() {
  if (!isSanityConfigured) return null;
  try {
    const query = `*[_type == "announcement" && enabled == true][0]{ text, link }`;
    return await sanityClient.fetch(query);
  } catch {
    return null;
  }
}

export async function getTestimonialsData() {
  if (!isSanityConfigured) return [];
  try {
    const query = `*[_type == "testimonial"]{ _id, name, role, content, rating, avatar }`;
    const raw = await sanityClient.fetch(query);
    if (!raw || raw.length === 0) return [];
    return raw.map((item: any) => ({
      ...item,
      avatarUrl: item.avatar ? urlFor(item.avatar) : null,
    }));
  } catch {
    return [];
  }
}

export async function getAboutData() {
  if (!isSanityConfigured) return null;
  try {
    const query = `*[_type == "about"][0]{ title, subtitle, ourStory, heroImage, values }`;
    const data = await sanityClient.fetch(query);
    if (!data) return null;
    return {
      ...data,
      imageUrl: data.heroImage ? urlFor(data.heroImage) : null,
    };
  } catch {
    return null;
  }
}

export async function getCategoryHeaderData() {
  if (!isSanityConfigured) return null;
  try {
    const query = `*[_type == "categoryHeader"] | order(_createdAt desc)[0]{ subtitle, title, description }`;
    return await sanityClient.fetch(query);
  } catch {
    return null;
  }
}
