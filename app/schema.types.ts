import { Tables } from '@/lib/supabase/schema.types'
import { z } from 'zod'
import { selectMaterialCountByName } from './actions'

export type Material = Tables<'material'>
export type Service = Tables<'service'>
export type ServiceMaterial = Tables<'service_material'>

export const materialSchema = z.object({
    type: z.enum(["SOUND", "LIGHT", "VIDEO","ELECT","OTHER"]),
    name: z.string().min(1, { message: 'Required' }).refine(async (name) => {
        const count = await selectMaterialCountByName(name)
        console.log(count)
        return count === 0;
    }, { message: "Déjà utilisé"}),
    category: z.string().min(1, { message: 'Requis' }),
    quantity: z.coerce.number().positive()
})

export const serviceMaterialSchema = z.object({
    service: z.string().uuid(),
    material: z.string(),
    quantity: z.number().positive()
})

export const dateRangeSchema = z
  .object({
    from: z.date(),
    to: z.date(),
  })
  .refine((data) => data.from < data.to, {
    message: "From date must be before to date",
  })
;

export const serviceSchema = z.object({
    uid: z.string().uuid().nullable(),
    at: dateRangeSchema,
    material_at: dateRangeSchema.nullable(),
    client: z.string(),
    name: z.string(),
    info: z.string().nullable(),
    service_material: serviceMaterialSchema.array()
})