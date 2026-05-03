import { mockTrades, mockChartData, mockExposureData } from "@/lib/mock-data";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge, formatCurrency, formatNumber } from "@/lib/utils-etrm";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";
import { ArrowUpRight, Upload, Plus } from "lucide-react";
import { Link } from "wouter";

export default function Dashboard() {
  const recentTrades = mockTrades.slice(0, 10);
  
  return (
    <Layout title="Dashboard">
      <div className="space-y-6">
        <div className="flex flex-wrap gap-2 justify-end mb-4">
          <Button size="sm" variant="outline"><Upload className="w-4 h-4 mr-2" /> Upload Broker File</Button>
          <Link href="/trades"><Button size="sm"><Plus className="w-4 h-4 mr-2" /> Capture Trade</Button></Link>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Position (MWh)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-mono">1,245,000</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Daily P&L</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500 font-mono">+£450,200</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Open Exposure</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-mono">£12.4M</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Trades Pending Validation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-500 font-mono">14</div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Position Over Time (30 Days)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockChartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis dataKey="date" tick={{fontSize: 12}} tickFormatter={(val) => val.split('-').slice(1).join('/')} stroke="hsl(var(--muted-foreground))" />
                    <YAxis tick={{fontSize: 12}} tickFormatter={(val) => `${(val/1000000).toFixed(1)}M`} stroke="hsl(var(--muted-foreground))" />
                    <Tooltip contentStyle={{backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))'}} />
                    <Line type="stepAfter" dataKey="position" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>P&L Over Time (30 Days)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockChartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis dataKey="date" tick={{fontSize: 12}} tickFormatter={(val) => val.split('-').slice(1).join('/')} stroke="hsl(var(--muted-foreground))" />
                    <YAxis tick={{fontSize: 12}} tickFormatter={(val) => `£${(val/1000000).toFixed(1)}M`} stroke="hsl(var(--muted-foreground))" />
                    <Tooltip contentStyle={{backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))'}} />
                    <Line type="monotone" dataKey="pnl" stroke="#22c55e" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Exposure by Counterparty (Top 6)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockExposureData} layout="vertical" margin={{ left: 50 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))" />
                    <XAxis type="number" tick={{fontSize: 12}} tickFormatter={(val) => `£${(val/1000000).toFixed(1)}M`} stroke="hsl(var(--muted-foreground))" />
                    <YAxis type="category" dataKey="counterparty" tick={{fontSize: 12}} stroke="hsl(var(--muted-foreground))" width={100} />
                    <Tooltip cursor={{fill: 'hsl(var(--muted)/0.5)'}} contentStyle={{backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))'}} />
                    <Bar dataKey="exposure" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Trades</CardTitle>
            <Link href="/trades"><Button variant="ghost" size="sm">View All <ArrowUpRight className="w-4 h-4 ml-1" /></Button></Link>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-muted-foreground bg-muted/50">
                    <th className="p-3 font-medium">Trade ID</th>
                    <th className="p-3 font-medium">Date</th>
                    <th className="p-3 font-medium">Counterparty</th>
                    <th className="p-3 font-medium">Product</th>
                    <th className="p-3 font-medium text-right">Volume</th>
                    <th className="p-3 font-medium text-right">Price</th>
                    <th className="p-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTrades.map(trade => (
                    <tr key={trade.id} className="border-b last:border-0 hover:bg-muted/30">
                      <td className="p-3 font-mono">{trade.id}</td>
                      <td className="p-3">{trade.date}</td>
                      <td className="p-3">{trade.counterparty}</td>
                      <td className="p-3">{trade.product}</td>
                      <td className="p-3 text-right font-mono">{formatNumber(trade.volume)}</td>
                      <td className="p-3 text-right font-mono">£{trade.price.toFixed(2)}</td>
                      <td className="p-3">
                        <StatusBadge status={trade.status} />
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
