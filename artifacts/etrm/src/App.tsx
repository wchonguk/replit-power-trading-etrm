import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/dashboard";
import Trades from "@/pages/trades";
import Positions from "@/pages/positions";
import Validation from "@/pages/validation";
import Confirmations from "@/pages/confirmations";
import Settlement from "@/pages/settlement";
import MarketData from "@/pages/market-data";
import MasterData from "@/pages/master-data";
import Insights from "@/pages/insights";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/trades" component={Trades} />
      <Route path="/positions" component={Positions} />
      <Route path="/validation" component={Validation} />
      <Route path="/confirmations" component={Confirmations} />
      <Route path="/settlement" component={Settlement} />
      <Route path="/market-data" component={MarketData} />
      <Route path="/master-data" component={MasterData} />
      <Route path="/insights" component={Insights} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
