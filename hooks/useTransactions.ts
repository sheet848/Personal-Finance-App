import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

const PAGE_SIZE = 10

export function useTransactions({
  search,
  category,
  recurring,
  page,
}) {
  const [data, setData] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true)
      const supabase = createClient()

      let query = supabase
        .from('transactions')
        .select('*', { count: 'exact' })
        .order('date', { ascending: false })
        .range(
          (page - 1) * PAGE_SIZE,
          page * PAGE_SIZE - 1
        )

      if (search) {
        query = query.or(
          `name.ilike.%${search}%,category.ilike.%${search}%`
        )
      }

      if (category !== 'all') {
        query = query.eq('category', category)
      }

      if (recurring !== 'all') {
        query = query.eq('recurring', recurring === 'true')
      }

      const { data, count } = await query

      setData(data ?? [])
      setTotalPages(Math.ceil((count ?? 0) / PAGE_SIZE))
      setLoading(false)
    }

    fetchTransactions()
  }, [search, category, recurring, page])

  return { data, totalPages, loading }
}
