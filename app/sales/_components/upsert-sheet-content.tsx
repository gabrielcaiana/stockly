"use client";

import { z } from "zod";
import { useState } from "react";

import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../../_components/ui/sheet";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { Combobox, ComboboxOption } from "@/app/_components/ui/combobox";
import { Button } from "@/app/_components/ui/button";
import { PlusIcon } from "lucide-react";
import { Product } from "@prisma/client";

interface UpsertSheetContentProps {
  products: Product[]
  productOptions: ComboboxOption[];
}

const formSchema = z.object({
  productId: z.string().cuid({
    message: "O produto 'é obrigatório",
  }),
  quantity: z.coerce.number().int().positive(),
});

type FormSchema = z.infer<typeof formSchema>;

interface SelectedProduct {
  id: string
  name: string
  price: number
  quantity: number
}

const UpsertSheetContent = ({ products, productOptions }: UpsertSheetContentProps) => {
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([])

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productId: "",
      quantity: 1,
    },
  });

  const onSubmit = (data: FormSchema) => {
    const selectedProduct = products.find(product => product.id === data.productId)

    if(!selectedProduct) return

    setSelectedProducts((prev) => [
      ...prev,
      {
        id: selectedProduct.id,
        name: selectedProduct.name,
        price: Number(selectedProduct.price),
        quantity: data.quantity
      }
    ])
  }

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Nova venda</SheetTitle>
        <SheetDescription>
          Insira os dados para inserir uma nova venda.
        </SheetDescription>
      </SheetHeader>

      <Form {...form}>
        <form className="space-y-6 py-6" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="productId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Produto</FormLabel>
                <FormControl>
                  <Combobox
                    options={productOptions}
                    placeholder="Selecione um produto"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantidade</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    placeholder="Digite a quantidade"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full gap-2" variant="secondary">
            <PlusIcon size={20} />
            Adicionar produto à venda
          </Button>
        </form>
        

        { selectedProducts.length > 0 && (
          <div className="space-y-4">
            {selectedProducts.map(product => (
              <div key={product.id}>
                <p>{product.name}</p>
                <p>{product.price}</p>
                <p>{product.quantity}</p>
              </div>
            ))}
          </div>
        )}
      </Form>
    </SheetContent>
  );
};

export default UpsertSheetContent;
