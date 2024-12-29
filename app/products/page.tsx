import { PlusIcon } from "lucide-react";
import { Button } from "../_components/ui/button";
import { DataTable } from "../_components/ui/data-table";
import { productTableColumns } from "./_components/table-columns";
import {
  chachedGetProducts,
  // getProducts,
} from "../_data-access/product/get-products";

// this is responsible for the dynamic data fetching
// export const dynamic = "force-dynamic";

const Products = async () => {
  const products = await chachedGetProducts();

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

        <Button className="gap-2">
          <PlusIcon size={20} />
          Novo produto
        </Button>
      </div>

      <DataTable columns={productTableColumns as []} data={parseProducts} />
    </div>
  );
};

export default Products;
