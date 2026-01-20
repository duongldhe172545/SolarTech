import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import avatar1 from "@/assets/avatar-1.jpg";
import avatar2 from "@/assets/avatar-2.jpg";
import avatar3 from "@/assets/avatar-3.jpg";

const REVIEWS = [
  {
    name: "Gia đình anh Tuấn",
    role: "Khách hàng Q.7, TP.HCM",
    content: "Từ ngày lắp gói 5kWp, hóa đơn điện giảm từ 2.5 triệu xuống còn hơn 400k. App theo dõi rất trực quan, biết được ngày nào nắng nhiều sinh điện nhiều. Rất hài lòng với đội ngũ kỹ thuật của Solar Tech.",
    image: avatar1
  },
  {
    name: "Chị Lan Anh",
    role: "Chủ chuỗi Coffee House",
    content: "Tôi lắp hệ thống 15kWp cho quán cafe. Ban ngày dùng điều hòa nhiều nên tận dụng tối đa điện mặt trời. Hoàn vốn nhanh hơn dự tính, chỉ khoảng 3.5 năm là đã thu hồi đủ chi phí đầu tư.",
    image: avatar2
  },
  {
    name: "Anh Minh Đức",
    role: "Kỹ sư phần mềm",
    content: "Thích nhất là công nghệ giám sát AI của bên này. Hệ thống tự động cảnh báo khi có tấm pin bị che bóng. Thi công đi dây rất gọn gàng, thẩm mỹ, đúng chuẩn kỹ thuật.",
    image: avatar3
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="text-primary font-mono text-sm tracking-widest uppercase">Testimonials</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2 uppercase text-foreground">
            Khách hàng <span className="text-primary">Nói gì?</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {REVIEWS.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-card/30 backdrop-blur border border-white/5 p-8 rounded-lg relative group hover:bg-white/5 transition-colors"
            >
              <Quote className="absolute top-8 right-8 text-primary/20 h-12 w-12 group-hover:text-primary/40 transition-colors" />
              
              <div className="flex items-center gap-1 text-yellow-500 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>

              <p className="text-muted-foreground leading-relaxed mb-8 relative z-10 min-h-[100px]">
                "{review.content}"
              </p>

              <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-primary/50">
                  <img src={review.image} alt={review.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground uppercase text-sm">{review.name}</h4>
                  <p className="text-xs text-primary font-mono">{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
