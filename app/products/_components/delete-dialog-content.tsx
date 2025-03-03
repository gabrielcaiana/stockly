import { deleteProduct } from "@/app/_actions/product/delete-product";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/_components/ui/alert-dialog";

import { toast } from "sonner"

interface DeleteDialogContentProps {
  name: string;
  id: string;
}

function DeleteProductDialogContent ( { product }: { product: DeleteDialogContentProps }) {
  const handleContinueClick = async () => {
    try {
      await deleteProduct({ id: product.id });
      toast.success("Produto excluído com sucesso");
    } catch (error) {
      console.error(error)

      toast.error("Ocorreu um erro ao excluir o produto")
    }
  }

  return (
    <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Você deseja realmente excluir?</AlertDialogTitle>
      <AlertDialogDescription>
        Você está prestes a excluir o produto <strong>{product.name}</strong>. Essa ação é irreversível.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancelar</AlertDialogCancel>
      <AlertDialogAction onClick={handleContinueClick}>Continuar</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
  )
}

export default DeleteProductDialogContent