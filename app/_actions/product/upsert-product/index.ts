'use server'

import { db } from "@/app/_lib/prisma"
import { revalidateTag } from "next/cache"
import { upsertProductSchema, UpsertProductSchema } from "./schema"

export const upsertProduct = async (data: UpsertProductSchema)  => {
  upsertProductSchema.parse(data)

  const { id, ...payload } = data

  await db.product.upsert({
    where: { id: id ?? "" },
    update: payload,
    create: payload
  }),
  
  // o revalidatePath é uma função que vai revalidar a página que foi passada como argumento
  // revalidatePath('/products')

  // o revalidateTag vai revalidar apenas as chamadas que foram feitas com a tag passada como argumento
  revalidateTag('get-products')
}