import { Layout } from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import { counterparties, books, products } from "@/lib/mock-data";
import { StatusBadge } from "@/lib/utils-etrm";

export default function MasterData() {
  return (
    <Layout title="Master Data">
      <Card>
        <CardContent className="p-6">
          <Tabs defaultValue="counterparties">
            <div className="flex justify-between items-center mb-6">
              <TabsList>
                <TabsTrigger value="counterparties">Counterparties</TabsTrigger>
                <TabsTrigger value="books">Books</TabsTrigger>
                <TabsTrigger value="products">Products</TabsTrigger>
              </TabsList>
              <Button size="sm"><Plus className="w-4 h-4 mr-2"/> Add Record</Button>
            </div>
            
            <TabsContent value="counterparties">
              <div className="border rounded-md">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50 text-left">
                      <th className="p-4 font-medium">Name</th>
                      <th className="p-4 font-medium">Short Code</th>
                      <th className="p-4 font-medium">LEI</th>
                      <th className="p-4 font-medium">Status</th>
                      <th className="p-4 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {counterparties.map((cp, i) => (
                      <tr key={cp} className="border-b last:border-0 hover:bg-muted/20">
                        <td className="p-4 font-medium">{cp}</td>
                        <td className="p-4 font-mono text-muted-foreground">{cp.substring(0, 4).toUpperCase()}</td>
                        <td className="p-4 font-mono text-xs">549300{(Math.random() * 1000000000).toFixed(0).padStart(9, '0')}</td>
                        <td className="p-4"><StatusBadge status="Approved" /></td>
                        <td className="p-4 text-right space-x-2">
                          <Button variant="ghost" size="icon"><Edit className="w-4 h-4" /></Button>
                          <Button variant="ghost" size="icon" className="text-destructive"><Trash2 className="w-4 h-4" /></Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            
            <TabsContent value="books">
              <div className="border rounded-md">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50 text-left">
                      <th className="p-4 font-medium">Book Name</th>
                      <th className="p-4 font-medium">Trader</th>
                      <th className="p-4 font-medium">Status</th>
                      <th className="p-4 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {books.map((book) => (
                      <tr key={book} className="border-b last:border-0 hover:bg-muted/20">
                        <td className="p-4 font-medium">{book}</td>
                        <td className="p-4">A. Morgan</td>
                        <td className="p-4"><StatusBadge status="Approved" /></td>
                        <td className="p-4 text-right space-x-2">
                          <Button variant="ghost" size="icon"><Edit className="w-4 h-4" /></Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="products">
              <div className="border rounded-md">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50 text-left">
                      <th className="p-4 font-medium">Product Name</th>
                      <th className="p-4 font-medium">Commodity</th>
                      <th className="p-4 font-medium">Unit</th>
                      <th className="p-4 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((prod) => (
                      <tr key={prod} className="border-b last:border-0 hover:bg-muted/20">
                        <td className="p-4 font-medium">{prod}</td>
                        <td className="p-4">{prod.includes('Power') ? 'Power' : prod.includes('Gas') ? 'Gas' : 'Other'}</td>
                        <td className="p-4 font-mono">{prod.includes('Gas') ? 'Therms' : 'MWh'}</td>
                        <td className="p-4"><StatusBadge status="Approved" /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </Layout>
  );
}
