type Transaction = {
  id: string
  name: string
  amount: number
  date: string // ISO string
  recurring: boolean
  paid: boolean // or status: 'paid' | 'upcoming'
}

export function useRecurringSummary(transactions: Transaction[]) {
  const recurringBills = transactions.filter(t => t.recurring)

  const today = new Date()
  const DAYS_DUE_SOON = 7

  const isDueSoon = (date: string) => {
    const billDate = new Date(date)
    const diff =
      (billDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    return diff >= 0 && diff <= DAYS_DUE_SOON
  }

  const totalBills = recurringBills.reduce(
    (sum, b) => sum + b.amount,
    0
  )

  const paidBills = recurringBills
    .filter(b => b.paid)
    .reduce((sum, b) => sum + b.amount, 0)

  const totalUpcoming = recurringBills
    .filter(b => !b.paid)
    .reduce((sum, b) => sum + b.amount, 0)

  const dueSoon = recurringBills
    .filter(b => !b.paid && isDueSoon(b.date))
    .reduce((sum, b) => sum + b.amount, 0)

  return {
    totalBills,
    paidBills,
    totalUpcoming,
    dueSoon,
  }
}
