import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Zap, Lock, User } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [, setLocation] = useLocation();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock Login Logic
    setTimeout(() => {
      if (username === "admin" && password === "admin") {
        localStorage.setItem("isAdmin", "true");
        toast.success("Đăng nhập thành công!");
        setLocation("/admin");
      } else {
        toast.error("Tài khoản hoặc mật khẩu không đúng! (Gợi ý: admin/admin)");
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(var(--color-primary),0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--color-primary),0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] z-0" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 bg-card/50 backdrop-blur-xl border border-white/10 rounded-lg shadow-[0_0_50px_-10px_rgba(var(--color-primary),0.3)] relative z-10"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4 border border-primary/50 relative group">
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            <Zap className="h-8 w-8 text-primary relative z-10" />
          </div>
          <h1 className="text-3xl font-bold uppercase tracking-wider text-foreground">
            Solar<span className="text-primary">CMS</span>
          </h1>
          <p className="text-muted-foreground text-sm mt-2">Hệ thống quản trị tập trung</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username">Tài khoản</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                id="username"
                type="text" 
                placeholder="admin" 
                className="pl-10 bg-background/50 border-white/10 focus-visible:ring-primary h-12"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Mật khẩu</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                id="password"
                type="password" 
                placeholder="•••••" 
                className="pl-10 bg-background/50 border-white/10 focus-visible:ring-primary h-12"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-primary text-black hover:bg-primary/90 font-bold uppercase h-12 text-lg shadow-[0_0_20px_rgba(var(--color-primary),0.3)] hover:shadow-[0_0_30px_rgba(var(--color-primary),0.5)] transition-all"
            disabled={isLoading}
          >
            {isLoading ? "Đang xác thực..." : "Đăng nhập hệ thống"}
          </Button>
        </form>

        <div className="mt-6 text-center text-xs text-muted-foreground">
          <p>Mặc định: admin / admin</p>
        </div>
      </motion.div>
    </div>
  );
}
