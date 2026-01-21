import { Home, ArrowLeftRight, PieChart, Wallet, Receipt } from 'lucide-react';

export const sidebarItems = [
  { label: 'Overview', href: '/overview', icon: Home },
  { label: 'Transactions', href: '/transactions', icon: ArrowLeftRight },
  { label: 'Budgets', href: '/budgets', icon: PieChart },
  { label: 'Pots', href: '/pots', icon: Wallet },
  { label: 'Recurring bills', href: '/recurring-bills', icon: Receipt },
];
