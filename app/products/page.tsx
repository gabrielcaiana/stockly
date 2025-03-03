
import { DataTable } from "../_components/ui/data-table";
import { productTableColumns } from "./_components/table-columns";
import {
  // cachedGetRandomNumber,
  chachedGetProducts,
  // getProducts,
} from "../_data-access/product/get-products";
import CreateProductButton from "./_components/create-product-button";

// this is responsible for the dynamic data fetching
// export const dynamic = "force-dynamic";

// dessa forma a página inteira vai ser gerada estática e vai ser revalidada a cada 60 segundos
// export const revalidate = 60;

const Products = async () => {
  const products = await chachedGetProducts();

  // Exemplo para simular duas chamadas de servidor sendo atualizadas separadamente com revalidateTag
  // const randomNumber = await cachedGetRandomNumber();

  // This is a workaround to avoid a Prisma error when serializing the data
  // The error is: "Converting circular structure to JSON"
  const parseProducts = JSON.parse(JSON.stringify(products));

  return (
    <div className="w-full space-y-8 bg-white p-8">
      <div className="flex w-full items-center justify-between">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-500">
            Gestão de produtos
          </span>
          <h2 className="text-xl font-semibold">Produtos</h2>
        </div>
        <CreateProductButton />
        {/* {randomNumber} */}
      </div>

      <DataTable columns={productTableColumns} data={parseProducts} />
    </div>
  );
};

export default Products;
