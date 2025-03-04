"use client";

import { useState } from "react";

import {
  AlertDialog,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";
import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";

import { Product } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import {
  ClipboardCopyIcon,
  EditIcon,
  MoreHorizontalIcon,
  TrashIcon,
} from "lucide-react";

import { toast } from "sonner";
import DeleteProductDialogContent from "./delete-dialog-content";
import { Dialog, DialogTrigger } from "@/app/_components/ui/dialog";
import UpsertProductDialogDialog from "./upsert-dialog-content";

const inStock = "IN_STOCK";

const getStatusLabel = (status: string) => {
  if (status === inStock) return "Em estoque";
  else return "Sem estoque";
};

export const productTableColumns: ColumnDef<Product & { status: string }>[] = [
  {
    accessorKey: "name",
    header: "Produto",
  },
  {
    accessorKey: "price",
    header: "Valor unitário",
    cell: (row) => {
      const product = row.row.original;
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(Number(product.price));
    }
  },
  {
    accessorKey: "stock",
    header: "Estoque",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (row) => {
      const product = row.row.original;
      const label = getStatusLabel(product.status);
      return (
        <Badge variant={product.status === inStock ? `default` : "destructive"}>
          {label}
        </Badge>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: function ActionCell(row) {
      const [editDialogIsOpen, setEditDialogIsOpen] = useState(false);

      const product = row.row.original;

      const copyId = () => {
        navigator.clipboard.writeText(product.id);
        toast.success("ID copiado com sucesso!");
      };

      return (
        <AlertDialog>
          <Dialog open={editDialogIsOpen} onOpenChange={setEditDialogIsOpen}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                  <MoreHorizontalIcon size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Ações</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem className="gap-1.5" onClick={copyId}>
                  <ClipboardCopyIcon size={16} />
                  Copiar ID
                </DropdownMenuItem>

                <DialogTrigger asChild>
                  <DropdownMenuItem className="gap-1.5">
                    <EditIcon size={16} />
                    Editar
                  </DropdownMenuItem>
                </DialogTrigger>

                <AlertDialogTrigger className="flex gap-1.5">
                  <DropdownMenuItem className="gap-1.5">
                    <TrashIcon size={16} />
                    Excluir
                  </DropdownMenuItem>
                </AlertDialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>

            <UpsertProductDialogDialog defaultValues={{
              id: product.id,
              name: product.name,
              price: Number(product.price),
              stock: product.stock,
            }}
            onSuccess={() => setEditDialogIsOpen(false)}
            />

            <DeleteProductDialogContent product={product} />
          </Dialog>
        </AlertDialog>
      );
    },
  },
];
