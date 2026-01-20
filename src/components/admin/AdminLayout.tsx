import { useState } from "react";
import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings, 
  LogOut, 
  Menu,
  Zap,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const SIDEBAR_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: Package, label: "Sản phẩm", href: "/admin/products" },
  { icon: ShoppingCart, label: "Đơn hàng", href: "/admin/orders" },
  { icon: Users, label: "Khách hàng", href: "/admin/customers" },
  { icon: FileText, label: "Bài viết", href: "/admin/blog" },
  { icon: Settings, label: "Cấu hình", href: "/admin/settings" },
];

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [location] = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-card border-r border-primary/20">
      <div className="p-6 border-b border-white/10 flex items-center gap-3">
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full animate-pulse" />
          <Zap className="h-6 w-6 text-primary relative z-10" />
        </div>
        <span className="font-display text-xl font-bold tracking-widest">
          SOLAR<span className="text-primary">CMS</span>
        </span>
      </div>
      
      <div className="flex-1 py-6 px-4 space-y-2">
        {SIDEBAR_ITEMS.map((item) => {
          const isActive = location === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <div 
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-200 cursor-pointer group relative overflow-hidden",
                  isActive 
                    ? "bg-primary/10 text-primary border border-primary/20 shadow-[0_0_10px_-5px_var(--color-primary)]" 
                    : "text-muted-foreground hover:text-white hover:bg-white/5"
                )}
              >
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary shadow-[0_0_10px_var(--color-primary)]" />
                )}
                <item.icon className={cn("h-5 w-5", isActive && "text-primary")} />
                <span className="font-medium tracking-wide">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-white/10">
        <Link href="/">
          <Button variant="outline" className="w-full gap-2 border-white/10 hover:bg-white/5 hover:text-white">
            <LogOut className="h-4 w-4" />
            Về trang chủ
          </Button>
        </Link>
      </div>
    </div>
  );

  return (
    <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
      <div className="min-h-screen bg-background text-foreground flex font-body">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 fixed inset-y-0 z-50">
          <SidebarContent />
        </aside>

        {/* Mobile Sidebar */}
        <SheetContent side="left" className="p-0 w-64 bg-background border-r border-white/10">
          <SidebarContent />
        </SheetContent>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 min-h-screen flex flex-col">
          <header className="h-16 border-b border-primary/20 bg-background/80 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <h1 className="text-lg font-bold uppercase tracking-wider text-muted-foreground">
                {SIDEBAR_ITEMS.find(i => i.href === location)?.label || "Dashboard"}
              </h1>
            </div>
            
            <div className="flex items-center gap-4">
               <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs font-mono text-green-500">SYSTEM ONLINE</span>
               </div>
               <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center">
                  <span className="font-bold text-xs text-primary">AD</span>
               </div>
            </div>
          </header>

          <div className="flex-1 p-6 md:p-8 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {children}
            </motion.div>
          </div>
        </main>
      </div>
    </Sheet>
  );
}
