import { z } from "zod";

export const upsertProductSchema = z.object({
  id: z.string().optional(),
  name: z.string().trim().min(1, {
    message: "O nome do produto é obrigatório",
  }),
  price: z.coerce.number().positive({
    message: 'O valor do produto deve ser'
  }).min(0.01, {
    message: "O preço do produto é obrigatório",
  }),
  stock: z.coerce.number().positive({
    message: 'A quantidade em estoque deve ser positiva'
  }).int().min(0, {
    message: "O estoque é obrigatório",
  }),
});

export type UpsertProductSchema = z.infer<typeof upsertProductSchema>