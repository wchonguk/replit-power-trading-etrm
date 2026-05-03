import { counterparties, products, books, statuses } from "./mock-data";
import { Badge } from "@/components/ui/badge";

export function getStatusBadgeVariant(status: string) {
  switch(status) {
    case 'Approved':
    case 'Settled':
    case 'Confirmed':
    case 'Matched':
      return 'bg-green-500/10 text-green-500 border-green-500/20';
    case 'Rejected':
    case 'Failed':
    case 'Disputed':
      return 'bg-red-500/10 text-red-500 border-red-500/20';
    case 'Pending Validation':
    case 'Pending':
      return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
    case 'Sent':
      return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
    default:
      return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
  }
}

export function StatusBadge({ status }: { status: string }) {
  return (
    <Badge variant="outline" className={getStatusBadgeVariant(status)}>
      {status}
    </Badge>
  );
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0 }).format(value);
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat('en-GB').format(value);
}
