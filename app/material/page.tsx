"use client"

import { Tables } from "@/lib/supabase/schema.types"
import { Column, ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Edit } from "lucide-react"
import { DataTable } from "@/components/ui/data-table"
import { selectMaterials } from './actions'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import MaterialDrawer from "./_component/MaterialDrawer"
import { useEffect, useState } from "react"

const SortableColumnHeader = function ({
  column,
  children,
}: Readonly<{
  column: Column<any, any>,
  children: React.ReactNode;
}>) {
  return (
    <Button
    variant="link"
    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  >
    {children}
    <ArrowUpDown className="ml-2 h-4 w-4" />
  </Button>
  );
}

const columns: ColumnDef<Tables<'material'>>[] = [
  {
    accessorKey: "type",
    header: ({ column }) => (<SortableColumnHeader column={column}>Type</SortableColumnHeader>)
  },
  {
    accessorKey: "category",
    header: ({ column }) => (<SortableColumnHeader column={column}>Catégorie</SortableColumnHeader>)
  },
  {
    accessorKey: "name",
    header: ({ column }) => (<SortableColumnHeader column={column}>Nom</SortableColumnHeader>)
  },
  {
    accessorKey: "quantity",
    header: () => <div className="text-right">Quantité</div>,
    cell: ({ row }) => <div className="text-right font-medium">{row.getValue("quantity")}</div>,
  },
  {
    id:"action",
    header: () => <div className="text-right">Action</div>,
    cell: ({ row }) => (
      <div className="text-right font-medium">
        <Button variant="ghost" size="icon" asChild>
        <Link href={`/material/${encodeURIComponent(row.getValue("name"))}`}>          
            <Edit className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    )
  }
]

export default function MaterialPage() {

  const [materials, setMaterials] = useState<Tables<'material'>[]>([])

  const fetchMaterials = async () => {
    const data = await selectMaterials()
    setMaterials(data)
  }

  useEffect(() => {
    fetchMaterials()
  }, [])

  return (
    <div className="container mx-auto py-10">
      <MaterialDrawer />
      <DataTable columns={columns} data={materials} />
    </div>
  )
}
