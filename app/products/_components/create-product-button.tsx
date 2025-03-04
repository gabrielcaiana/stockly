"use client";

import { PlusIcon } from "lucide-react";

import {
  Dialog,
  DialogTrigger,
} from "../../_components/ui/dialog";
import { Button } from "@/app/_components/ui/button";

import { useState } from "react";
import UpsertProductDialogDialog from "./upsert-dialog-content";

function CreateProductButton() {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <PlusIcon size={20} />
          Novo produto
        </Button>
      </DialogTrigger>

      <UpsertProductDialogDialog onSuccess={() => setDialogIsOpen(false)} />
    </Dialog>
  );
}

export default CreateProductButton;
