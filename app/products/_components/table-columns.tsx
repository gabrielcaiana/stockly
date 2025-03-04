"use client";

import { Badge } from "@/app/_components/ui/badge";

import { Product } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import TableDropdownMenu from "./table-dropdown-menu";

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
    cell: (row) => <TableDropdownMenu product={row.row.original} />
  },
];
