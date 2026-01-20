import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { label: "LỢI ÍCH", href: "/benefits" },
  { label: "QUY TRÌNH", href: "/process" }, // New
  { label: "DỰ ÁN", href: "/projects" },   // New
  { label: "SẢN PHẨM", href: "/products" },
  { label: "HOÀN VỐN", href: "/roi" },
  { label: "FAQ", href: "/faq" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location, setLocation] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = (id: string) => {
    setIsOpen(false);
    setLocation(`/${id}`);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        scrolled 
          ? "bg-background/80 backdrop-blur-md border-primary/20 py-2 shadow-[0_0_15px_-5px_var(--color-primary)]" 
          : "bg-transparent border-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <div 
          className="flex items-center gap-2 font-display text-2xl font-bold cursor-pointer group"
          onClick={() => handleScroll("hero")}
        >
          <div className="relative">
             <div className="absolute inset-0 bg-primary/50 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
             <Zap className="h-8 w-8 text-primary relative z-10" />
          </div>
          <span className="tracking-widest">SOLAR<span className="text-primary">TECH</span></span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.href}
              onClick={() => handleScroll(item.href.replace("/", ""))}
              className="relative px-4 py-2 text-sm font-medium hover:text-primary transition-colors uppercase tracking-wider group overflow-hidden"
            >
              <span className="relative z-10">{item.label}</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </button>
          ))}
          <Button 
            className="ml-4 bg-primary text-primary-foreground hover:bg-primary/90 rounded-sm font-bold px-6 uppercase tracking-wider shadow-[0_0_10px_var(--color-primary)] hover:shadow-[0_0_20px_var(--color-primary)] transition-all"
            onClick={() => handleScroll("contact")}
          >
            Tư vấn ngay
          </Button>
        </div>

        {/* Mobile Nav */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon" className="text-foreground">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-background/95 backdrop-blur-xl border-l border-primary/20 w-[80%]">
            <div className="flex flex-col gap-6 mt-10">
              {NAV_ITEMS.map((item, index) => (
                <motion.button
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  key={item.href}
                  onClick={() => handleScroll(item.href.replace("/", ""))}
                  className="text-2xl font-display font-bold text-left hover:text-primary transition-colors uppercase flex items-center gap-4"
                >
                  <span className="text-xs font-mono text-primary/50">0{index + 1}</span>
                  {item.label}
                </motion.button>
              ))}
              <Button 
                className="bg-primary text-black hover:bg-primary/90 rounded-none font-bold py-6 text-lg uppercase w-full mt-4"
                onClick={() => handleScroll("contact")}
              >
                Nhận báo giá
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.nav>
  );
}
