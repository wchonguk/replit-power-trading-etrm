import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { mockChartData } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Upload, RefreshCw } from "lucide-react";

export default function MarketData() {
  return (
    <Layout title="Market Data">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <Select defaultValue="power">
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Curve Group" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="power">UK Power (Base/Peak)</SelectItem>
                <SelectItem value="gas">TTF Gas</SelectItem>
                <SelectItem value="carbon">EUA Carbon</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="30d">
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 Days</SelectItem>
                <SelectItem value="30d">Last 30 Days</SelectItem>
                <SelectItem value="90d">Last 90 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline"><Upload className="w-4 h-4 mr-2" /> Upload Curve</Button>
            <Button><RefreshCw className="w-4 h-4 mr-2" /> Refresh Data</Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Forward Curve Prices</CardTitle>
            <CardDescription>Closing settlement prices for selected contracts (£/MWh)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[500px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="date" tickFormatter={(val) => val.split('-').slice(1).join('/')} stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" domain={['auto', 'auto']} />
                  <Tooltip contentStyle={{backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))'}} />
                  <Legend />
                  <Line type="monotone" dataKey="power" name="UK Power Q1-25 Base" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="gas" name="UK Power Q1-25 Peak" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="carbon" name="UK Power Q2-25 Base" stroke="hsl(var(--chart-3))" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
