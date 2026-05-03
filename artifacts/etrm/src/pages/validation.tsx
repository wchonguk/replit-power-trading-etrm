import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { mockTrades, mockAuditTrail } from "@/lib/mock-data";
import { StatusBadge, formatCurrency, formatNumber } from "@/lib/utils-etrm";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CheckCircle2, XCircle, Edit, History } from "lucide-react";

export default function Validation() {
  const validationTrades = mockTrades.filter(t => t.status === 'Pending Validation');
  const [selectedTradeId, setSelectedTradeId] = useState<string | null>(validationTrades.length > 0 ? validationTrades[0].id : null);
  
  const selectedTrade = validationTrades.find(t => t.id === selectedTradeId);

  return (
    <Layout title="Validation & Approvals">
      <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-8rem)]">
        <Card className="lg:col-span-2 flex flex-col overflow-hidden">
          <CardHeader className="shrink-0">
            <CardTitle>Trade Queue</CardTitle>
            <CardDescription>{validationTrades.length} trades pending validation</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto p-0">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-card z-10 shadow-[0_1px_0_0_var(--border)]">
                <tr className="text-left text-muted-foreground bg-muted/50">
                  <th className="p-3 font-medium">Trade ID</th>
                  <th className="p-3 font-medium">Counterparty</th>
                  <th className="p-3 font-medium">Product</th>
                  <th className="p-3 font-medium text-right">Volume</th>
                  <th className="p-3 font-medium">Submitter</th>
                </tr>
              </thead>
              <tbody>
                {validationTrades.map(trade => (
                  <tr 
                    key={trade.id} 
                    onClick={() => setSelectedTradeId(trade.id)}
                    className={`border-b cursor-pointer hover:bg-muted/50 ${selectedTradeId === trade.id ? 'bg-primary/5 border-l-4 border-l-primary' : 'border-l-4 border-l-transparent'}`}
                  >
                    <td className="p-3 font-mono">{trade.id}</td>
                    <td className="p-3">{trade.counterparty}</td>
                    <td className="p-3">{trade.product}</td>
                    <td className="p-3 text-right font-mono">{formatNumber(trade.volume)}</td>
                    <td className="p-3">{trade.submittedBy}</td>
                  </tr>
                ))}
                {validationTrades.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-muted-foreground">Queue is empty. All caught up!</td>
                  </tr>
                )}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {selectedTrade ? (
          <div className="flex flex-col gap-4 overflow-hidden">
            <Card className="shrink-0">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{selectedTrade.id}</CardTitle>
                    <CardDescription>Submitted by {selectedTrade.submittedBy}</CardDescription>
                  </div>
                  <StatusBadge status={selectedTrade.status} />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-sm">
                  <div>
                    <div className="text-muted-foreground text-xs">Counterparty</div>
                    <div className="font-medium">{selectedTrade.counterparty}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground text-xs">Book</div>
                    <div className="font-medium">{selectedTrade.book}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground text-xs">Product</div>
                    <div className="font-medium">{selectedTrade.product}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground text-xs">Direction</div>
                    <div className={`font-bold ${selectedTrade.buySell === 'Buy' ? 'text-blue-500' : 'text-purple-500'}`}>{selectedTrade.buySell}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground text-xs">Volume</div>
                    <div className="font-mono">{formatNumber(selectedTrade.volume)} MWh</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground text-xs">Price</div>
                    <div className="font-mono">£{selectedTrade.price.toFixed(2)}</div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-muted-foreground text-xs">Delivery Period</div>
                    <div>{selectedTrade.deliveryStart} to {selectedTrade.deliveryEnd}</div>
                  </div>
                </div>
                
                <div className="flex gap-2 pt-4 border-t">
                  <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white"><CheckCircle2 className="w-4 h-4 mr-2" /> Approve</Button>
                  <Button variant="destructive" className="flex-1"><XCircle className="w-4 h-4 mr-2" /> Reject</Button>
                  <Button variant="outline" size="icon"><Edit className="w-4 h-4" /></Button>
                </div>
              </CardContent>
            </Card>

            <Card className="flex-1 overflow-hidden flex flex-col">
              <CardHeader className="py-3 px-4 shrink-0 border-b bg-muted/20">
                <CardTitle className="text-sm flex items-center"><History className="w-4 h-4 mr-2" /> Audit Trail</CardTitle>
              </CardHeader>
              <CardContent className="p-0 overflow-auto flex-1">
                <div className="p-4 space-y-4">
                  {mockAuditTrail.map(audit => (
                    <div key={audit.id} className="relative pl-4 border-l-2 border-muted">
                      <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-primary ring-4 ring-card"></div>
                      <div className="text-xs text-muted-foreground mb-1">{audit.timestamp} • {audit.user}</div>
                      <div className="text-sm font-medium">{audit.action}</div>
                      <div className="text-sm mt-1">{audit.comments}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card className="flex items-center justify-center text-muted-foreground">
            Select a trade to view details
          </Card>
        )}
      </div>
    </Layout>
  );
}
