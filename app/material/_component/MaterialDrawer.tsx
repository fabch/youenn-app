"use client"

import { useState } from "react"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import MaterialForm from "./MaterialForm"


export default function MaterialPage() {

  const [open, setOpen] = useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen} direction="right">
      <DrawerTrigger>Ajouter</DrawerTrigger>
      <DrawerContent className="w-sm py-4 px-6">
        <DrawerHeader>        
            <DrawerTitle>Ajout de matériel</DrawerTitle>
        </DrawerHeader>
        <MaterialForm onSuccess={() => setOpen(false)} />
      </DrawerContent>
    </Drawer>
  )
}
