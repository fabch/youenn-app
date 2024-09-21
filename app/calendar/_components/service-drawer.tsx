"use client"

import { useState } from "react"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import ServiceForm from "@/app/_components/service-form";


export default function ServiceDrawer() {

  const [open, setOpen] = useState(true);

  return (
    <Drawer open={open} onOpenChange={setOpen} direction="right">
      <DrawerTrigger>Ajouter</DrawerTrigger>
      <DrawerContent className="w-lg py-4 px-6">
        <DrawerHeader>        
            <DrawerTitle>Ajout de matériel</DrawerTitle>
        </DrawerHeader>
        <ServiceForm onSuccess={() => setOpen(false)} />
      </DrawerContent>
    </Drawer>
  )
}
