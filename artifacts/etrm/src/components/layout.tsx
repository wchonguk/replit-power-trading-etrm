import { Link, useLocation } from "wouter";
import { Bell, Settings, User } from "lucide-react";

export function Layout({ children, title }: { children: React.ReactNode, title: string }) {
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "Dashboard" },
    { href: "/trades", label: "Trade Blotter" },
    { href: "/positions", label: "Positions" },
    { href: "/validation", label: "Validation & Approvals" },
    { href: "/confirmations", label: "Confirmations" },
    { href: "/settlement", label: "Settlement" },
    { href: "/market-data", label: "Market Data" },
    { href: "/master-data", label: "Master Data" },
    { href: "/insights", label: "Insights" },
  ];

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside className="w-[220px] bg-sidebar border-r border-sidebar-border flex flex-col">
        <div className="p-4 border-b border-sidebar-border">
          <h1 className="text-xl font-bold font-mono tracking-tight text-sidebar-primary">POWER ETRM</h1>
        </div>
        <nav className="flex-1 py-4">
          <ul className="space-y-1 px-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${location === item.href ? 'bg-sidebar-accent text-sidebar-accent-foreground' : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'}`}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-14 bg-card border-b border-border flex items-center justify-between px-6 shrink-0">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              <Bell className="h-5 w-5" />
            </button>
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              <Settings className="h-5 w-5" />
            </button>
            <div className="flex items-center space-x-2 border-l pl-4 border-border">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-medium">Alex Morgan</div>
                <div className="text-xs text-muted-foreground">Senior Trader</div>
              </div>
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                <User className="h-4 w-4" />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
