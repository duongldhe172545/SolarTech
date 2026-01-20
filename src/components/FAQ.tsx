import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";

const FAQS = [
  {
    question: "Hệ thống có hoạt động khi mất điện lưới không?",
    answer: "Đối với hệ thống hòa lưới bám tải tiêu chuẩn, khi mất điện lưới hệ thống sẽ tự động ngắt để đảm bảo an toàn cho nhân viên sửa chữa điện. Nếu quý khách muốn dùng khi mất điện, cần lắp đặt hệ thống Hybrid có lưu trữ (giá thành cao hơn)."
  },
  {
    question: "Tuổi thọ tấm pin là bao lâu?",
    answer: "Tấm pin năng lượng mặt trời có tuổi thọ thiết kế lên đến 30 năm. Chúng tôi cam kết bảo hành hiệu suất trên 80% trong 25 năm. Sau 25 năm, pin vẫn hoạt động tốt với hiệu suất giảm dần."
  },
  {
    question: "Ban đêm hệ thống có sinh ra điện không?",
    answer: "Không. Hệ thống chỉ sinh điện khi có ánh sáng mặt trời. Ban đêm nhà bạn sẽ sử dụng điện lưới bình thường. Phần điện tiết kiệm được ban ngày sẽ bù trừ cho chi phí điện ban đêm."
  },
  {
    question: "Thủ tục đăng ký với điện lực như thế nào?",
    answer: "Hiện tại chính sách mua bán điện đang thay đổi. Tuy nhiên với hệ thống hòa lưới bám tải (Zero Export), bạn có thể lắp đặt để tự dùng mà không cần thủ tục phức tạp. Chúng tôi sẽ hỗ trợ trọn gói vấn đề pháp lý và kỹ thuật."
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="py-24 bg-background relative">
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-16">
        <div>
          <motion.h2 
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             className="text-4xl font-bold text-foreground mb-8 uppercase"
          >
             Câu hỏi <span className="text-primary">Thường gặp</span>
          </motion.h2>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {FAQS.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border border-white/5 bg-white/5 px-6 rounded-lg data-[state=open]:border-primary/50 data-[state=open]:bg-primary/5 transition-colors">
                <AccordionTrigger className="text-foreground hover:text-primary text-left font-medium text-lg py-6 uppercase tracking-wide">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6 pl-4 border-l-2 border-primary/20">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <motion.div 
           id="contact" 
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           className="bg-card border border-white/10 p-8 md:p-12 rounded-xl shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl rounded-full pointer-events-none" />
          
          <h2 className="text-3xl font-bold mb-2 uppercase text-foreground relative z-10">Liên hệ tư vấn</h2>
          <p className="text-muted-foreground mb-8 relative z-10">
            Để lại thông tin, kỹ thuật viên sẽ gọi lại tư vấn gói lắp đặt phù hợp và khảo sát miễn phí trong 24h.
          </p>
          
          <form className="space-y-4 relative z-10" onSubmit={(e) => e.preventDefault()}>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase text-primary">Họ tên</label>
                <Input placeholder="Nguyễn Văn A" className="bg-background/50 border-white/10 focus-visible:ring-primary focus-visible:border-primary rounded-sm h-12" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase text-primary">Số điện thoại</label>
                <Input placeholder="0909 xxx xxx" className="bg-background/50 border-white/10 focus-visible:ring-primary focus-visible:border-primary rounded-sm h-12" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase text-primary">Địa chỉ lắp đặt (Quận/Huyện)</label>
              <Input placeholder="Ví dụ: Quận 7, TP.HCM" className="bg-background/50 border-white/10 focus-visible:ring-primary focus-visible:border-primary rounded-sm h-12" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold uppercase text-primary">Nhu cầu / Ghi chú</label>
              <Textarea placeholder="Gia đình dùng khoảng 2 triệu tiền điện/tháng..." className="bg-background/50 border-white/10 focus-visible:ring-primary focus-visible:border-primary rounded-sm min-h-[100px]" />
            </div>

            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold uppercase h-14 text-lg rounded-sm mt-4 shadow-[0_0_20px_-5px_var(--color-primary)] hover:shadow-[0_0_30px_-5px_var(--color-primary)] transition-shadow">
              Gửi yêu cầu
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
