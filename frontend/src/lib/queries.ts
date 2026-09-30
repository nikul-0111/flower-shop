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

export const DEFAULT_CATEGORIES: Category[] = [
  {
    id: 'cat-1',
    name: 'Fresh Bouquets',
    slug: 'bouquets',
    description: 'Hand-tied vibrant floral arrangements',
    image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=600&q=80&fm=webp',
    itemCount: 24,
  },
  {
    id: 'cat-2',
    name: 'Ecuador Roses',
    slug: 'roses',
    description: 'Classic velvety long-stemmed roses',
    image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=600&q=80&fm=webp',
    itemCount: 18,
  },
  {
    id: 'cat-3',
    name: 'Wedding & Bridal',
    slug: 'wedding',
    description: 'Purity white lilies and orchids',
    image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=600&q=80&fm=webp',
    itemCount: 15,
  },
  {
    id: 'cat-4',
    name: 'Birthday Blooms',
    slug: 'birthday',
    description: 'Cheerful bright sunflowers & spray roses',
    image: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=600&q=80&fm=webp',
    itemCount: 20,
  },
  {
    id: 'cat-5',
    name: 'Anniversary Specials',
    slug: 'anniversary',
    description: 'Blush pink tulips & peony mixes',
    image: 'https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=600&q=80&fm=webp',
    itemCount: 12,
  },
  {
    id: 'cat-6',
    name: 'Lush Houseplants',
    slug: 'plants',
    description: 'Air-purifying monsteras & potted orchids',
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=600&q=80&fm=webp',
    itemCount: 16,
  },
];

export async function getAllCategories(): Promise<Category[]> {
  if (!isSanityConfigured) return DEFAULT_CATEGORIES;
  try {
    const query = `*[_type == "category"] {
      _id,
      title,
      name,
      slug,
      description,
      image
    }`;
    const rawData = await sanityClient.fetch(query);
    if (!rawData || rawData.length === 0) return DEFAULT_CATEGORIES;
    return rawData.map((item: any) => ({
      id: item._id,
      name: item.title || item.name || 'Category',
      slug: typeof item.slug === 'string' ? item.slug : item.slug?.current || 'category',
      description: item.description || '',
      image: item.image ? urlFor(item.image) : DEFAULT_CATEGORIES[0].image,
      itemCount: 10,
    }));
  } catch (err) {
    console.warn('Sanity category fetch error:', err);
    return DEFAULT_CATEGORIES;
  }
}
