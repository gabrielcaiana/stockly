'use server'

import { db } from "@/app/_lib/prisma"
import { revalidateTag } from "next/cache"
import { createProductSchema, CreateProductSchema } from "./schema"

export const createProduct = async (data: CreateProductSchema)  => {
  createProductSchema.parse(data)

  await db.product.create({
    data
  }),
  
  // o revalidatePath é uma função que vai revalidar a página que foi passada como argumento
  // revalidatePath('/products')

  // o revalidateTag vai revalidar apenas as chamadas que foram feitas com a tag passada como argumento
  revalidateTag('get-products')
}