'use server'

import { Tables } from '@/lib/supabase/schema.types'
import { createClient } from '@/lib/supabase/server'
import { QueryResult, QueryData, QueryError, PostgrestError } from '@supabase/supabase-js'

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

export async function insertMaterial(material: Tables<'material'>) {
    const supabase = createClient()
  
    const materialQuery = supabase.from('material').insert(material)
    type MaterialQuery = QueryData<typeof materialQuery>;
    const { data, error } = await materialQuery
    if (error) throw error;
    return data as MaterialQuery
}