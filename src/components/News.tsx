import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import news1 from "@/assets/news-1.jpg";
import news2 from "@/assets/news-2.jpg";
import news3 from "@/assets/news-3.png";

const NEWS = [
  {
    id: 1,
    title: "Chính sách điện mặt trời áp mái tự sản tự tiêu 2026",
    category: "Tin tức",
    date: "15/01/2026",
    excerpt: "Chính phủ vừa ban hành cơ chế khuyến khích phát triển điện mặt trời mái nhà mới, tập trung vào mô hình tự sản tự tiêu với nhiều ưu đãi thuế.",
    image: news1
  },
  {
    id: 2,
    title: "Công nghệ Pin Solar thế hệ mới: Hiệu suất vượt 25%",
    category: "Công nghệ",
    date: "12/01/2026",
    excerpt: "Dòng pin mới sử dụng công nghệ Perovskite kết hợp Silicon giúp tăng hiệu suất chuyển đổi năng lượng lên mức kỷ lục, giảm diện tích lắp đặt.",
    image: news2
  },
  {
    id: 3,
    title: "Báo cáo tăng trưởng năng lượng tái tạo toàn cầu",
    category: "Thị trường",
    date: "10/01/2026",
    excerpt: "Năng lượng mặt trời tiếp tục dẫn đầu xu hướng chuyển dịch năng lượng xanh, chiếm 60% tổng công suất lắp đặt mới trong năm qua.",
    image: news3
  }
];

export default function News() {
  return (
    <section className="py-24 bg-background relative overflow-hidden border-t border-white/5">
      <div className="absolute right-0 bottom-0 w-1/3 h-1/2 bg-primary/5 blur-3xl pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="text-left">
            <span className="text-primary font-mono text-sm tracking-widest uppercase">Latest Updates</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-2 uppercase text-foreground">
              Tin tức & <span className="text-primary">Sự kiện</span>
            </h2>
          </div>
          <Button variant="outline" className="hidden md:flex gap-2 rounded-sm border-primary/20 text-primary hover:bg-primary hover:text-black hover:border-primary transition-all shadow-[0_0_10px_rgba(0,0,0,0)] hover:shadow-[0_0_15px_var(--color-primary)]">
            Xem tất cả <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {NEWS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group bg-card/40 backdrop-blur border border-white/10 hover:border-primary/50 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_-10px_var(--color-primary)] flex flex-col h-full"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-black/60 backdrop-blur border border-white/20 text-xs font-bold uppercase text-white rounded-full flex items-center gap-1">
                    <Tag className="h-3 w-3 text-primary" />
                    {item.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3 font-mono">
                  <Calendar className="h-3 w-3" />
                  {item.date}
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {item.title}
                </h3>
                
                <p className="text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-3">
                  {item.excerpt}
                </p>
                
                <div className="mt-auto">
                   <a href="#" className="inline-flex items-center text-sm font-bold text-primary hover:text-white transition-colors uppercase tracking-wider group/link">
                     Đọc tiếp <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                   </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
          <Button variant="outline" className="w-full gap-2 rounded-sm border-primary/20 text-primary hover:bg-primary hover:text-black">
             Xem tất cả <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
