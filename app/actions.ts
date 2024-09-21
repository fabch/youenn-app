'use server'

import { createClient } from '@/lib/supabase/server'
import { QueryResult, QueryData, QueryError, PostgrestError } from '@supabase/supabase-js'
import { Material } from './schema.types'

export async function selectMaterials() {
  const supabase = createClient()

  const materialsQuery = supabase.from('material').select('*')
  type MaterialsQuery = QueryData<typeof materialsQuery>;
  const { data, error } = await materialsQuery
  if (error) throw error;

  return data as MaterialsQuery
}

export async function selectMaterialCountByName(name: string) {
    const supabase = createClient()
  
    const { count, error } = await supabase.from('material').select('*', { count: "estimated", head: true }).eq('name',name)
    if (error) throw error;
    
    return count
  }

export async function insertMaterial(material: Material) {
    const supabase = createClient()
  
    const materialQuery = supabase.from('material').insert(material)
    type MaterialQuery = QueryData<typeof materialQuery>;
    const { data, error } = await materialQuery
    if (error) throw error;
    return data as MaterialQuery
}

export async function selectServices() {
    const supabase = createClient()
  
    const serviceQuery = supabase.from('service').select('*, service_material (*)')
    type ServicesQuery = QueryData<typeof serviceQuery>;
    const { data, error } = await serviceQuery
    if (error) throw error;
  
    return data as ServicesQuery
}

export async function selectServicesMaterialFrom(start: Date, end: Date) {
    const supabase = createClient()
  
    const serviceMaterialQuery = supabase.from('service_material').select('*, service (*)')
    type ServiceMaterialQuery = QueryData<typeof serviceMaterialQuery>;
    const { data, error } = await serviceMaterialQuery
    if (error) throw error;
  
    return data as ServiceMaterialQuery
}