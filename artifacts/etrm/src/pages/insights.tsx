import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { mockInsights } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, AlertTriangle, TrendingUp, LineChart } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Insights() {
  const getIcon = (category: string) => {
    switch (category) {
      case 'Risk': return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case 'Opportunity': return <TrendingUp className="w-5 h-5 text-green-500" />;
      case 'Market': return <LineChart className="w-5 h-5 text-blue-500" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <Layout title="AI Insights">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All Insights</TabsTrigger>
              <TabsTrigger value="risk">Risk</TabsTrigger>
              <TabsTrigger value="opportunity">Opportunity</TabsTrigger>
              <TabsTrigger value="market">Market</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0">
            <Sparkles className="w-4 h-4 mr-2" /> Generate New Insights
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockInsights.map(insight => (
            <Card key={insight.id} className="flex flex-col">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="outline" className={
                    insight.category === 'Risk' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                    insight.category === 'Opportunity' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                    'bg-blue-500/10 text-blue-500 border-blue-500/20'
                  }>
                    {insight.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{insight.timestamp}</span>
                </div>
                <div className="flex gap-3 items-center">
                  {getIcon(insight.category)}
                  <CardTitle className="text-lg">{insight.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {insight.description}
                </p>
              </CardContent>
              <CardFooter className="pt-4 border-t bg-muted/20">
                <Button variant="ghost" size="sm" className="w-full">View Details</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}
