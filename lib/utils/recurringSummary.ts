type Transaction = {
  id: string
  name: string
  amount: number
  date: string // ISO string
  recurring: boolean
}

export function recurringSummary(transactions: Transaction[]) {
  const now = new Date();

  // Only recurring transactions
  const recurring = transactions.filter(t => t.recurring);

  const totalBills = recurring.length;

  const paidBills = recurring.filter(t => {
    return new Date(t.date) < now;
  }).length;

  const totalUpcoming = recurring
    .filter(t => new Date(t.date) >= now)
    .reduce((sum, t) => sum + t.amount, 0);

  const dueSoon = recurring.filter(t => {
    const billDate = new Date(t.date);
    const diffInDays =
      (billDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);

    return diffInDays >= 0 && diffInDays <= 7;
  }).length;

  return {
    totalBills,
    paidBills,
    totalUpcoming,
    dueSoon,
  }
}
