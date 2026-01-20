import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { motion } from "framer-motion";

const data = [
  { year: "Năm 1", saving: 18, cost: 72 },
  { year: "Năm 2", saving: 36, cost: 72 },
  { year: "Năm 3", saving: 54, cost: 72 },
  { year: "Năm 4", saving: 72, cost: 72 },
  { year: "Năm 5", saving: 90, cost: 72 },
  { year: "Năm 6", saving: 108, cost: 72 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background/90 backdrop-blur-md border border-primary/50 p-4 rounded-lg shadow-[0_0_15px_var(--color-primary)]">
        <p className="font-bold text-primary mb-1 uppercase tracking-wider">{label}</p>
        <p className="text-sm text-muted-foreground">
          Lũy kế tiết kiệm: <span className="text-foreground font-bold text-lg">{payload[0].value} Triệu</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function ROIChart() {
  return (
    <section id="roi" className="py-24 border-y border-white/5 bg-background relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(var(--color-primary),0.1),transparent_50%)]" />
      
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="space-y-8">
          <motion.div
             initial={{ opacity: 0, x: -50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground uppercase leading-tight">
              Đầu tư 1 lần <br/> Lợi nhuận <span className="text-primary text-glow">20 năm</span>
            </h2>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground leading-relaxed border-l-4 border-primary/50 pl-6"
          >
            Với gói 5kWp tiêu chuẩn, bạn chỉ mất chưa đến 4 năm để thu hồi vốn đầu tư ban đầu. 
            Hệ thống pin Tier 1 đảm bảo hiệu suất ổn định trong suốt 25 năm, mang lại dòng tiền thụ động an toàn.
          </motion.p>
          
          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 group hover:bg-white/5 px-2 transition-colors">
              <span className="text-muted-foreground group-hover:text-primary transition-colors">Chi phí đầu tư (Gói 5kWp)</span>
              <span className="text-xl font-bold text-foreground">72.000.000đ</span>
            </div>
            <div className="flex items-center justify-between border-b border-white/10 pb-4 group hover:bg-white/5 px-2 transition-colors">
              <span className="text-muted-foreground group-hover:text-primary transition-colors">Tiết kiệm hằng năm</span>
              <span className="text-xl font-bold text-foreground">~18.000.000đ</span>
            </div>
            <div className="flex items-center justify-between border-b border-white/10 pb-4 group hover:bg-white/5 px-2 transition-colors">
              <span className="text-muted-foreground group-hover:text-primary transition-colors">Lợi suất đầu tư (ROI)</span>
              <span className="text-xl font-bold text-primary">25% / năm</span>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-black/40 border-primary/20 backdrop-blur-xl shadow-2xl">
            <CardHeader>
              <CardTitle className="uppercase text-primary tracking-wide">Biểu đồ hoàn vốn (Triệu VNĐ)</CardTitle>
              <CardDescription>So sánh chi phí đầu tư và lũy kế tiết kiệm</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                    <XAxis 
                      dataKey="year" 
                      stroke="#888" 
                      tick={{fill: '#888', fontSize: 12}} 
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis 
                      stroke="#888" 
                      tick={{fill: '#888', fontSize: 12}} 
                      tickLine={false}
                      axisLine={false}
                      unit="Tr"
                    />
                    <Tooltip cursor={{fill: 'rgba(var(--color-primary),0.1)'}} content={<CustomTooltip />} />
                    <Bar 
                      dataKey="saving" 
                      fill="currentColor" 
                      className="fill-primary" 
                      radius={[4, 4, 0, 0]} 
                      name="Tiết kiệm" 
                      barSize={40}
                      animationDuration={1500}
                    >
                       <LabelList 
                          dataKey="saving" 
                          position="top" 
                          fill="white" 
                          formatter={(value: number) => value > 72 ? `${value}Tr` : ''} 
                          style={{ fontWeight: 'bold' }}
                       />
                    </Bar>
                    {/* Visual Threshold Line for Cost */}
                    <path d={`M 0 ${350 - (72/120)*350} L 1000 ${350 - (72/120)*350}`} stroke="red" strokeDasharray="5 5" strokeWidth={1}/>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6 flex items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                   <div className="w-3 h-3 bg-primary rounded-sm"></div>
                   <span className="text-muted-foreground">Lũy kế tiết kiệm</span>
                </div>
                <div className="flex items-center gap-2">
                   <div className="w-3 h-px bg-red-500 border-t border-dashed border-red-500"></div>
                   <span className="text-muted-foreground">Vốn đầu tư (72Tr)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
