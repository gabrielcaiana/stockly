"use client";

import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger } from "@/app/_components/ui/dropdown-menu";
import { Product } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ClipboardCopyIcon, EditIcon, MoreHorizontalIcon, TrashIcon } from "lucide-react";

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
    cell: (row) => {
      const product = row.row.original

      const copyId = () => navigator.clipboard.writeText(product.id)

      return (
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

            <DropdownMenuItem className="gap-1.5">
              <EditIcon size={16} />
              Editar
            </DropdownMenuItem>

            <DropdownMenuItem className="gap-1.5">
              <TrashIcon size={16} />
              Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
];
