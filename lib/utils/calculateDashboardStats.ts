interface Transaction {
  id: string;
  amount: number;
  category: string;
  date: string;
};

export function calculateDashboardStats(transactions: Transaction[]) {
  let income = 0
  let expenses = 0
  let balance = 0

  for (const tx of transactions) {
    balance += tx.amount

    if (tx.amount > 0) {
      income += tx.amount
    } else {
      expenses += Math.abs(tx.amount)
    }
  }

  return {
    income,
    expenses,
    balance,
  }
}
