import { Layout } from "@/components/layout";
import { mockTrades } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function Trades() {
  return (
    <Layout title="Trade Blotter">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex space-x-2 flex-1">
            <Input placeholder="Search Trade ID or Counterparty..." className="max-w-xs" />
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="pending">Pending Validation</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Product" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Products</SelectItem>
                <SelectItem value="power">UK Power</SelectItem>
                <SelectItem value="gas">TTF Gas</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Capture Trade</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Capture New Trade</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="counterparty">Counterparty</Label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="edf">EDF Energy</SelectItem>
                        <SelectItem value="shell">Shell Energy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="product">Product</Label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="p1">UK Power Q1-25</SelectItem>
                        <SelectItem value="g1">TTF Gas Apr-25</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="volume">Volume (MWh)</Label>
                    <Input id="volume" type="number" placeholder="50000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (£)</Label>
                    <Input id="price" type="number" placeholder="85.50" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Direction</Label>
                  <RadioGroup defaultValue="buy" className="flex space-x-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="buy" id="r1" />
                      <Label htmlFor="r1">Buy</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="sell" id="r2" />
                      <Label htmlFor="r2">Sell</Label>
                    </div>
                  </RadioGroup>
                </div>
                <Button type="submit" className="w-full">Submit Trade</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-muted-foreground bg-muted/50">
                    <th className="p-4 font-medium">Trade ID</th>
                    <th className="p-4 font-medium">Date</th>
                    <th className="p-4 font-medium">Counterparty</th>
                    <th className="p-4 font-medium">Product</th>
                    <th className="p-4 font-medium">Direction</th>
                    <th className="p-4 font-medium text-right">Volume (MWh)</th>
                    <th className="p-4 font-medium text-right">Price (£/MWh)</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockTrades.map(trade => (
                    <tr key={trade.id} className="border-b hover:bg-muted/30">
                      <td className="p-4 font-mono">{trade.id}</td>
                      <td className="p-4">{trade.date}</td>
                      <td className="p-4">{trade.counterparty}</td>
                      <td className="p-4">{trade.product}</td>
                      <td className="p-4">{trade.buySell}</td>
                      <td className="p-4 text-right font-medium">{trade.volume.toLocaleString()}</td>
                      <td className="p-4 text-right font-medium">£{trade.price}</td>
                      <td className="p-4">
                        <Badge variant="outline"
                          className={
                            trade.status === 'Approved' || trade.status === 'Confirmed' || trade.status === 'Settled' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                            trade.status === 'Rejected' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                            'bg-amber-500/10 text-amber-500 border-amber-500/20'
                          }
                        >
                          {trade.status}
                        </Badge>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <Button variant="ghost" size="sm">View</Button>
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
