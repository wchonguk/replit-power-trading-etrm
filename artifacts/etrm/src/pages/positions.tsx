import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { books, products, mockTrades } from "@/lib/mock-data";
import { formatCurrency, formatNumber } from "@/lib/utils-etrm";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Cell } from "recharts";

export default function Positions() {
  const positionByBook = books.map(book => {
    const bookTrades = mockTrades.filter(t => t.book === book);
    const netPosition = bookTrades.reduce((acc, t) => acc + (t.buySell === 'Buy' ? t.volume : -t.volume), 0);
    const mtm = bookTrades.reduce((acc, t) => acc + t.pnl, 0);
    return { book, netPosition, mtm };
  });

  const positionByProduct = products.map(product => {
    const prodTrades = mockTrades.filter(t => t.product === product);
    const netPosition = prodTrades.reduce((acc, t) => acc + (t.buySell === 'Buy' ? t.volume : -t.volume), 0);
    return { product, netPosition };
  });

  return (
    <Layout title="Positions">
      <div className="grid gap-6">
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Position By Product (Net MWh)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={positionByProduct} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis dataKey="product" tick={{fontSize: 10}} stroke="hsl(var(--muted-foreground))" />
                    <YAxis tick={{fontSize: 12}} tickFormatter={(val) => `${val/1000}k`} stroke="hsl(var(--muted-foreground))" />
                    <RechartsTooltip cursor={{fill: 'hsl(var(--muted)/0.5)'}} contentStyle={{backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))'}} />
                    <Bar dataKey="netPosition">
                      {positionByProduct.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.netPosition >= 0 ? "hsl(var(--primary))" : "#ef4444"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Position Exposure</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between p-4 border rounded-md bg-muted/20">
                  <div className="text-sm font-medium">Total Long Position</div>
                  <div className="font-mono text-primary font-bold">4,250,000 MWh</div>
                </div>
                <div className="flex justify-between p-4 border rounded-md bg-muted/20">
                  <div className="text-sm font-medium">Total Short Position</div>
                  <div className="font-mono text-destructive font-bold">-3,100,000 MWh</div>
                </div>
                <div className="flex justify-between p-4 border rounded-md bg-muted/20">
                  <div className="text-sm font-medium">Net Position</div>
                  <div className="font-mono font-bold">1,150,000 MWh</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-6">
            <Tabs defaultValue="book">
              <TabsList className="mb-4">
                <TabsTrigger value="book">By Book</TabsTrigger>
                <TabsTrigger value="product">By Product</TabsTrigger>
                <TabsTrigger value="delivery">By Delivery Date</TabsTrigger>
              </TabsList>
              
              <TabsContent value="book">
                <div className="border rounded-md overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-muted/50 text-left">
                        <th className="p-4 font-medium">Book</th>
                        <th className="p-4 font-medium text-right">Net Position (MWh)</th>
                        <th className="p-4 font-medium text-right">Market Value (£)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {positionByBook.map(row => (
                        <tr key={row.book} className="border-b last:border-0 hover:bg-muted/20">
                          <td className="p-4 font-medium">{row.book}</td>
                          <td className={`p-4 text-right font-mono ${row.netPosition < 0 ? 'text-destructive' : 'text-primary'}`}>
                            {formatNumber(row.netPosition)}
                          </td>
                          <td className={`p-4 text-right font-mono ${row.mtm < 0 ? 'text-red-500' : 'text-green-500'}`}>
                            {formatCurrency(row.mtm)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
              <TabsContent value="product">
                <div className="text-sm text-muted-foreground p-4 text-center border rounded-md">
                  Product breakdown table placeholder
                </div>
              </TabsContent>
              <TabsContent value="delivery">
                <div className="text-sm text-muted-foreground p-4 text-center border rounded-md">
                  Delivery date breakdown table placeholder
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
