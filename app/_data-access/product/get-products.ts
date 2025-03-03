import 'server-only'

import { db } from "@/app/_lib/prisma";
import { Product } from "@prisma/client";
import { unstable_cache } from 'next/cache';

export const getProducts = async (): Promise<Product[]> => {
  return db.product.findMany();
};

export const chachedGetProducts = unstable_cache( 
  getProducts,['get-products'], { 
    tags: ['get-products'],
    revalidate: 60
  });

export const cachedGetRandomNumber = unstable_cache(
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return Math.random()
  },
  ["getRandomNumber"],
  {
    tags: ["get-random-number"],
    revalidate: 60,
  }
)
