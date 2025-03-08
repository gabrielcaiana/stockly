import { Button } from "../_components/ui/button";
import { Sheet, SheetTrigger } from "../_components/ui/sheet";
import { chachedGetProducts } from "../_data-access/product/get-products";
import UpsertSheetContent from "./_components/upsert-sheet-content";

const SalesPage = async () => {
  const products = await chachedGetProducts();

  const productOptions = products.map((product) => ({
    value: product.id,
    label: product.name
  }))

  return (
    <div className="w-full space-y-8 bg-white p-8">
      <div className="flex w-full items-center justify-between">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-500">
            Gestão de vendas
          </span>
          <h2 className="text-xl font-semibold">Vendas</h2>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button>Adicionar venda</Button>
          </SheetTrigger>
          
          <UpsertSheetContent products={products} productOptions={productOptions} />
        </Sheet>
      </div>
    </div>
  );
};

export default SalesPage;
