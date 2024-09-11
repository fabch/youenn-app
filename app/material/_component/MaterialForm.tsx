'use client'

import { Tables } from "@/lib/supabase/schema.types";
import { z } from "zod"
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertMaterial, selectMaterialCountByName } from "../actions";

const schema = z.object({
    type: z.enum(["SOUND", "LIGHT", "VIDEO","ELECT","OTHER"]),
    name: z.string().min(1, { message: 'Required' }).refine(async (name) => {
        const count = await selectMaterialCountByName(name)
        console.log(count)
        return count === 0;
    }, { message: "Déjà utilisé"}),
    category: z.string().min(1, { message: 'Requis' }),
    quantity: z.coerce.number().positive()
})

export default function MaterialForm ({ onSuccess }: Readonly<{
    onSuccess:() => any
  }>) {
    const form = useForm<Tables<'material'>>({
        resolver: zodResolver(schema),
        defaultValues: {
            type: "OTHER",
            name: "",
            category: "",
            quantity: 1,
        }
    })

    const onSubmit:SubmitHandler<Tables<'material'>> = async (material) => {
        await insertMaterial(material);
        onSuccess()
    }

    return (
        <Form {...form}>
            <form 
                onSubmit={form.handleSubmit(onSubmit)} 
                className="space-y-8"
            >
                <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Type</FormLabel>
                        <FormControl>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a vType" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                <SelectItem value="SOUND">SOUND</SelectItem>
                                <SelectItem value="LIGHT">LIGHT</SelectItem>
                                <SelectItem value="VIDEO">VIDEO</SelectItem>
                                <SelectItem value="ELECT">ELECT</SelectItem>
                                <SelectItem value="OTHER">OTHER</SelectItem>
                                </SelectContent>
                            </Select>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Catégorie</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Nom</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Quantity</FormLabel>
                        <FormControl>
                            <Input type="number" min="1" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}