import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, MousePointer2 } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const scrollToProducts = () => {
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Dynamic Background */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-background/40 z-10 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-background/0 to-background/0 z-10" />
        <img 
          src={heroBg} 
          alt="Modern Solar House" 
          className="w-full h-full object-cover scale-105"
        />
        {/* Tech Grid Overlay */}
        <div className="absolute inset-0 z-20 bg-[linear-gradient(rgba(var(--color-primary),0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--color-primary),0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)]" />
      </motion.div>

      <div className="container mx-auto px-4 relative z-20 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 border border-primary/30 bg-primary/10 px-4 py-1.5 backdrop-blur-sm rounded-full"
          >
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium tracking-wide uppercase text-primary-foreground">Công nghệ Solar AI 2026</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.9] uppercase text-white"
          >
            Năng lượng <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-400 to-white animate-gradient-x bg-[length:200%_auto]">Tương lai</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-muted-foreground max-w-lg leading-relaxed border-l-2 border-primary/50 pl-6"
          >
            Hệ thống điện mặt trời thông minh tích hợp AI giám sát. 
            Tối ưu hóa hiệu suất, hoàn vốn trong <span className="text-primary font-bold">4 năm</span>. 
            Giải pháp Hightech cho ngôi nhà hiện đại.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 pt-4"
          >
            <Button 
              size="lg" 
              className="bg-primary text-primary-foreground hover:bg-primary/80 rounded-sm px-8 py-7 text-lg font-bold uppercase group relative overflow-hidden"
              onClick={scrollToProducts}
            >
              <span className="relative z-10 flex items-center gap-2">
                Xem Báo Giá <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-primary/30 text-primary hover:bg-primary/10 hover:text-white hover:border-primary rounded-sm px-8 py-7 text-lg font-bold uppercase backdrop-blur-sm"
              onClick={() => document.getElementById("roi")?.scrollIntoView({ behavior: "smooth" })}
            >
              <MousePointer2 className="mr-2 h-5 w-5" />
              Tính toán ROI
            </Button>
          </motion.div>
        </div>

        {/* Hero Visual Element (Optional: 3D or Abstract Tech Graphic placeholder) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="hidden lg:block relative"
        >
           <div className="relative w-full aspect-square max-w-[500px] mx-auto">
              <div className="absolute inset-0 border border-primary/20 rounded-full animate-[spin_10s_linear_infinite]" />
              <div className="absolute inset-4 border border-cyan-500/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
              </div>
              {/* Glass Card Floating */}
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 -right-10 bg-black/60 backdrop-blur-md border border-primary/30 p-4 rounded-lg shadow-xl max-w-[200px]"
              >
                 <div className="flex items-center gap-2 mb-2">
                    <Zap className="text-yellow-400 h-5 w-5" />
                    <span className="text-xs font-bold text-white uppercase">Hiệu suất</span>
                 </div>
                 <div className="text-2xl font-mono font-bold text-primary">98.6%</div>
                 <div className="text-[10px] text-muted-foreground">Tối ưu hóa năng lượng</div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-1/4 -left-10 bg-black/60 backdrop-blur-md border border-cyan-500/30 p-4 rounded-lg shadow-xl max-w-[200px]"
              >
                 <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-xs font-bold text-white uppercase">Hệ thống</span>
                 </div>
                 <div className="text-xl font-mono font-bold text-white">ONLINE</div>
                 <div className="h-1 w-full bg-gray-700 mt-2 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 w-[90%]" />
                 </div>
              </motion.div>
           </div>
        </motion.div>
      </div>
    </section>
  );
}
