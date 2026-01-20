import { motion } from "framer-motion";
import { ClipboardCheck, PencilRuler, Wrench, Smartphone } from "lucide-react";
import processInstall from "@/assets/process-install.jpg";
import processInverter from "@/assets/process-inverter.png";
import processApp from "@/assets/process-app.jpg";

const STEPS = [
  {
    icon: ClipboardCheck,
    title: "01. Khảo sát & Tư vấn",
    desc: "Đánh giá kết cấu mái, đo đạc diện tích và phân tích nhu cầu sử dụng điện để đề xuất giải pháp tối ưu.",
    image: null // Icon only or simple abstract
  },
  {
    icon: PencilRuler,
    title: "02. Thiết kế Kỹ thuật",
    desc: "Lên bản vẽ 3D mô phỏng, tính toán sản lượng điện dự kiến và phương án đi dây thẩm mỹ.",
    image: processInverter
  },
  {
    icon: Wrench,
    title: "03. Thi công Lắp đặt",
    desc: "Đội ngũ kỹ thuật viên chuyên nghiệp thực hiện lắp đặt nhanh chóng, an toàn, đúng tiêu chuẩn kỹ thuật.",
    image: processInstall
  },
  {
    icon: Smartphone,
    title: "04. Kích hoạt & Giám sát",
    desc: "Hòa lưới, hướng dẫn sử dụng App theo dõi sản lượng và bàn giao hệ thống cho khách hàng.",
    image: processApp
  }
];

export default function Process() {
  return (
    <section id="process" className="py-24 bg-background relative overflow-hidden">
      {/* Connecting Line */}
      <div className="absolute top-1/2 left-0 w-full h-px bg-primary/20 -translate-y-1/2 hidden lg:block" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-16 text-center">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-primary font-mono text-sm tracking-widest uppercase"
          >
            Workflow
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-foreground mt-2 uppercase"
          >
            Quy trình <span className="text-primary">Triển khai</span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {STEPS.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="bg-card/50 backdrop-blur-md border border-white/10 p-6 h-full flex flex-col hover:border-primary/50 transition-colors duration-300 rounded-lg overflow-hidden">
                <div className="mb-6 relative">
                   <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-black transition-colors duration-300">
                      <step.icon className="h-6 w-6 text-primary group-hover:text-black transition-colors" />
                   </div>
                   {step.image && (
                     <div className="w-full h-32 mb-4 overflow-hidden rounded-md border border-white/5 relative group-hover:border-primary/30 transition-colors">
                        <img 
                          src={step.image} 
                          alt={step.title} 
                          className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                     </div>
                   )}
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>

                {/* Number Watermark */}
                <div className="absolute -top-4 -right-4 text-9xl font-bold text-white/5 z-[-1] select-none font-display">
                  {index + 1}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
