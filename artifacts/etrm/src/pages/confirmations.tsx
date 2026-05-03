import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockTrades } from "@/lib/mock-data";
import { StatusBadge, formatNumber } from "@/lib/utils-etrm";
import { Button } from "@/components/ui/button";
import { Upload, Download, FileText, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Confirmations() {
  // Only show trades that need confirmations or have confirmations
  const confTrades = mockTrades.filter(t => t.status !== 'Rejected' && t.status !== 'Pending Validation').slice(0, 15);

  return (
    <Layout title="Confirmations">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
             <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="sent">Sent</SelectItem>
                <SelectItem value="matched">Matched</SelectItem>
                <SelectItem value="disputed">Disputed</SelectItem>
              </SelectContent>
            </Select>
            <Input placeholder="Trade ID or Counterparty" className="w-[250px]" />
          </div>
          <div className="space-x-2">
            <Button variant="outline"><Upload className="w-4 h-4 mr-2" /> Upload eConfirm</Button>
            <Button><FileText className="w-4 h-4 mr-2" /> Generate Selected</Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-muted-foreground bg-muted/50">
                    <th className="p-4 w-10"><input type="checkbox" className="rounded" /></th>
                    <th className="p-4 font-medium">Trade ID</th>
                    <th className="p-4 font-medium">Counterparty</th>
                    <th className="p-4 font-medium">Trade Date</th>
                    <th className="p-4 font-medium">Delivery</th>
                    <th className="p-4 font-medium">Details</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {confTrades.map(trade => (
                    <tr key={trade.id} className="border-b hover:bg-muted/30">
                      <td className="p-4"><input type="checkbox" className="rounded" /></td>
                      <td className="p-4 font-mono">{trade.id}</td>
                      <td className="p-4 font-medium">{trade.counterparty}</td>
                      <td className="p-4">{trade.date}</td>
                      <td className="p-4 text-xs whitespace-nowrap">{trade.deliveryStart}<br/>{trade.deliveryEnd}</td>
                      <td className="p-4 text-xs">
                        {trade.buySell} {formatNumber(trade.volume)} MWh<br/>
                        @ £{trade.price.toFixed(2)}
                      </td>
                      <td className="p-4">
                        <StatusBadge status={trade.confStatus || 'Pending'} />
                      </td>
                      <td className="p-4 text-right space-x-2">
                        {trade.confStatus === 'Matched' ? (
                           <Button variant="ghost" size="icon" className="text-green-500"><Check className="w-4 h-4" /></Button>
                        ) : trade.confStatus === 'Pending' ? (
                          <Button size="sm" variant="secondary">Send</Button>
                        ) : (
                          <Button size="sm" variant="outline">Review</Button>
                        )}
                        <Button variant="ghost" size="icon"><Download className="w-4 h-4" /></Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
