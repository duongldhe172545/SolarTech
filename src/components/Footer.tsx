import { Facebook, Instagram, Mail, Phone, MapPin, Zap, Lock } from "lucide-react";
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-black/80 border-t border-white/10 pt-16 pb-8 backdrop-blur-md relative overflow-hidden">
      {/* Footer Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
            <div className="flex items-center gap-2 font-display text-3xl font-bold text-foreground mb-6">
              <Zap className="text-primary h-8 w-8" />
              SOLAR<span className="text-primary">TECH</span>
            </div>
            <p className="text-muted-foreground max-w-md mb-8">
              Đơn vị tiên phong cung cấp giải pháp điện năng lượng mặt trời thông minh. 
              Tích hợp công nghệ AI giám sát và tối ưu hóa hiệu suất.
            </p>
            <div className="flex gap-4">
              <a href="#" className="h-10 w-10 border border-white/20 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-black hover:border-primary transition-all duration-300 rounded-sm">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="h-10 w-10 border border-white/20 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-black hover:border-primary transition-all duration-300 rounded-sm">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="h-10 w-10 border border-white/20 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-black hover:border-primary transition-all duration-300 rounded-sm">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-foreground font-bold uppercase mb-6 tracking-wider border-b border-primary/30 inline-block pb-1">Liên kết</h3>
            <ul className="space-y-4 text-muted-foreground">
              <li><a href="#hero" className="hover:text-primary transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-primary rounded-full opacity-0 hover:opacity-100 transition-opacity"/> Trang chủ</a></li>
              <li><a href="#benefits" className="hover:text-primary transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-primary rounded-full opacity-0 hover:opacity-100 transition-opacity"/> Lợi ích</a></li>
              <li><a href="#projects" className="hover:text-primary transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-primary rounded-full opacity-0 hover:opacity-100 transition-opacity"/> Dự án</a></li>
              <li><a href="#products" className="hover:text-primary transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-primary rounded-full opacity-0 hover:opacity-100 transition-opacity"/> Sản phẩm</a></li>
              <li><a href="#roi" className="hover:text-primary transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-primary rounded-full opacity-0 hover:opacity-100 transition-opacity"/> Bài toán hoàn vốn</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-foreground font-bold uppercase mb-6 tracking-wider border-b border-primary/30 inline-block pb-1">Liên hệ</h3>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex items-start gap-3 group">
                <MapPin className="h-5 w-5 shrink-0 text-primary group-hover:text-white transition-colors" />
                <span>123 Nguyễn Văn Linh, Quận 7, TP. Hồ Chí Minh</span>
              </li>
              <li className="flex items-center gap-3 group">
                <Phone className="h-5 w-5 shrink-0 text-primary group-hover:text-white transition-colors" />
                <span>0909 123 456</span>
              </li>
              <li className="flex items-center gap-3 group">
                <Mail className="h-5 w-5 shrink-0 text-primary group-hover:text-white transition-colors" />
                <span>info@solar-tech.vn</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2026 Solar Tech. All rights reserved.</p>
          <div className="flex gap-8 items-center">
            <a href="#" className="hover:text-primary transition-colors">Chính sách bảo mật</a>
            <a href="#" className="hover:text-primary transition-colors">Điều khoản sử dụng</a>
            <div className="w-px h-4 bg-white/20 mx-2"></div>
            <Link href="/admin">
               <a className="flex items-center gap-2 hover:text-primary transition-colors text-xs uppercase tracking-wide opacity-50 hover:opacity-100">
                  <Lock className="h-3 w-3" /> Admin Portal
               </a>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
