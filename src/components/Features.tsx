import { motion } from "framer-motion";
import { TrendingDown, ShieldCheck, Smartphone, Zap, Sun, Battery } from "lucide-react";

const FEATURES = [
  {
    icon: TrendingDown,
    title: "Hoàn vốn thần tốc",
    description: "Tối ưu hóa chi phí đầu tư và hiệu suất tấm pin, giúp rút ngắn thời gian hoàn vốn xuống chỉ còn 3.5 - 4 năm so với trung bình 6-7 năm."
  },
  {
    icon: ShieldCheck,
    title: "Bảo hành 25 năm",
    description: "Cam kết hiệu suất trên 80% trong suốt 25 năm. Bảo hành vật lý 12 năm. Đội ngũ kỹ thuật hỗ trợ 24/7 trọn đời dự án."
  },
  {
    icon: Smartphone,
    title: "Giám sát AI 24/7",
    description: "Theo dõi sản lượng điện thực tế. Cảnh báo sự cố tức thời qua App nhờ công nghệ AI phân tích dữ liệu hệ thống."
  },
  {
    icon: Sun,
    title: "Pin Tier 1 Quốc Tế",
    description: "Sử dụng các dòng pin Top 1 thế giới (Longi, Jinko, Canadian Solar) với công nghệ Half-cell hiệu suất cao."
  },
  {
    icon: Zap,
    title: "Inverter Hiệu suất cao",
    description: "Inverter chuyển đổi dòng điện với hiệu suất lên đến 98.6%. Hoạt động êm ái, tản nhiệt tốt, tuổi thọ cao."
  },
  {
    icon: Battery,
    title: "Lắp đặt thẩm mỹ",
    description: "Thi công gọn gàng, đi dây âm tường hoặc ống gen thẩm mỹ. Không làm ảnh hưởng đến kết cấu mái và kiến trúc."
  }
];

export default function Features() {
  return (
    <section id="benefits" className="py-24 bg-background relative overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-16 max-w-2xl">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-primary font-mono text-sm tracking-widest uppercase"
          >
            Why Choose Us
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-6 text-foreground uppercase mt-2"
          >
            Tại sao chọn <br /> Solar <span className="text-primary">Tech</span>?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg"
          >
            Công nghệ đi đầu, giải pháp tối ưu. Chúng tôi mang đến hệ thống điện mặt trời thông minh nhất cho ngôi nhà của bạn.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-8 border border-white/5 bg-white/5 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 group cursor-default rounded-lg relative overflow-hidden"
            >
              {/* Glow Effect */}
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-colors" />

              <feature.icon className="h-12 w-12 text-primary mb-6 group-hover:scale-110 group-hover:text-cyan-400 transition-all duration-300 relative z-10" />
              <h3 className="text-xl font-bold mb-4 text-foreground uppercase tracking-wide group-hover:text-primary transition-colors relative z-10">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed relative z-10 group-hover:text-white/80 transition-colors">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
