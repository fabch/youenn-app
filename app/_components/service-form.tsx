'use client'

import { Tables } from "@/lib/supabase/schema.types";
import { z } from "zod"
import { SubmitErrorHandler, SubmitHandler, UseFormRegister, useFieldArray, useForm } from "react-hook-form"
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
import { Service, serviceSchema } from "@/app/schema.types";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";


type CustomService = z.infer<typeof serviceSchema>;

function ServiceMaterialFields ({ register, index }: Readonly<{
    register: UseFormRegister<CustomService>,
    index: number
  }>){
    return (
        <>
            <input {...register(`service_material.${index}.service` as const)} />
            <input type="number" {...register(`service_material.${index}.quantity` as const)} />
        </>
    )
  }

export default function ServiceForm ({ onSuccess }: Readonly<{
    onSuccess:() => any
  }>) {
    const form = useForm<CustomService>({
        resolver: zodResolver(serviceSchema),
        defaultValues: {
            at: {
                from: (new Date()),
                to: (new Date()),
            },
            material_at: null,
            client: '',
            name: '',
            info: '',
            service_material: []
        }
    })

    const { fields, prepend, append } = useFieldArray({
        name: 'service_material',
        control: form.control
    });

    const onSubmit:SubmitHandler<CustomService> = async (service) => {
        console.log(service)
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
                    name="client"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Client</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="at"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nom</FormLabel>
                            <Popover modal={true}>
                                <PopoverTrigger asChild>
                                    <Button
                                    id="date"
                                    variant="outline"
                                    className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !field.value.from && "text-muted-foreground"
                                    )}
                                    >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {field.value.from ? (
                                        field.value.to ? (
                                        <>
                                            {format(field.value.from, "LLL dd, y")} -{" "}
                                            {format(field.value.to, "LLL dd, y")}
                                        </>
                                        ) : (
                                        format(field.value.from, "LLL dd, y")
                                        )
                                    ) : (
                                        <span>Pick a date</span>
                                    )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="center">
                                    <Calendar
                                    initialFocus
                                    mode="range"
                                    defaultMonth={field.value.from}
                                    selected={{
                                        from: field.value.from!,
                                        to: field.value.to,
                                    }}
                                    onSelect={field.onChange}
                                    numberOfMonths={2}
                                    />
                                </PopoverContent>
                                </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {fields.map((field, index) => (
                    <ServiceMaterialFields key={field.id} register={form.register} index={index} />
                ))}
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}