import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockTrades } from "@/lib/mock-data";
import { StatusBadge, formatCurrency, formatNumber } from "@/lib/utils-etrm";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function Settlement() {
  const settledTrades = mockTrades.filter(t => t.status === 'Settled' || t.status === 'Confirmed').slice(0, 20);
  
  const totalSettlementValue = settledTrades.reduce((acc, t) => acc + (t.volume * t.price), 0);
  const pendingValue = settledTrades.filter(t=>t.status==='Confirmed').reduce((acc, t) => acc + (t.volume * t.price), 0);

  return (
    <Layout title="Settlement">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Settlement Value (Period)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-mono">{formatCurrency(totalSettlementValue)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending Settlements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-500 font-mono">{formatCurrency(pendingValue)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Invoices Processed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-mono">{settledTrades.filter(t=>t.status==='Settled').length}</div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end">
          <Button variant="outline"><Download className="w-4 h-4 mr-2"/> Export CSV</Button>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-muted-foreground bg-muted/50">
                    <th className="p-4 font-medium">Trade ID</th>
                    <th className="p-4 font-medium">Counterparty</th>
                    <th className="p-4 font-medium">Delivery End</th>
                    <th className="p-4 font-medium text-right">Value (£)</th>
                    <th className="p-4 font-medium">Direction</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {settledTrades.map(trade => {
                    const value = trade.volume * trade.price;
                    return (
                      <tr key={trade.id} className="border-b hover:bg-muted/30">
                        <td className="p-4 font-mono">{trade.id}</td>
                        <td className="p-4">{trade.counterparty}</td>
                        <td className="p-4">{trade.deliveryEnd}</td>
                        <td className="p-4 text-right font-mono font-medium">{formatCurrency(value)}</td>
                        <td className="p-4">
                          <span className={trade.buySell === 'Buy' ? 'text-destructive font-medium' : 'text-green-600 font-medium'}>
                            {trade.buySell === 'Buy' ? 'Payable' : 'Receivable'}
                          </span>
                        </td>
                        <td className="p-4">
                          <StatusBadge status={trade.status === 'Settled' ? 'Settled' : 'Pending'} />
                        </td>
                        <td className="p-4 text-right">
                          <Button variant="ghost" size="sm">View Invoice</Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
