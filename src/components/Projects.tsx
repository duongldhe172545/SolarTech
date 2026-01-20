import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";

const PROJECTS = [
  {
    id: 1,
    title: "Villa Riverside Quận 7",
    specs: "10 kWp | Hệ thống Hybrid",
    image: project1,
    year: "2025"
  },
  {
    id: 2,
    title: "Penhouse Landmark 81",
    specs: "15 kWp | Lưu trữ 10kWh",
    image: project2,
    year: "2024"
  },
  {
    id: 3,
    title: "Nhà phố Cityland Gò Vấp",
    specs: "5 kWp | Hòa lưới bám tải",
    image: project3,
    year: "2025"
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 bg-background border-y border-white/5">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <span className="text-primary font-mono text-sm tracking-widest uppercase">Gallery</span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mt-2 uppercase">
              Dự án <span className="text-muted-foreground">Tiêu biểu</span>
            </h2>
          </div>
          <Button variant="outline" className="hidden md:flex gap-2 rounded-none border-primary/20 text-primary hover:bg-primary hover:text-black">
            Xem tất cả <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group relative h-[400px] overflow-hidden rounded-lg cursor-pointer"
            >
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:grayscale-0 grayscale"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              
              <div className="absolute bottom-0 left-0 w-full p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <div className="flex justify-between items-start mb-2">
                   <span className="text-primary font-mono text-xs border border-primary/30 px-2 py-1 rounded bg-black/50 backdrop-blur-sm">{project.year}</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-primary transition-colors">{project.title}</h3>
                <p className="text-gray-300 text-sm">{project.specs}</p>
              </div>
              
              {/* Overlay Hover Effect */}
              <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/50 transition-colors duration-300 rounded-lg pointer-events-none" />
            </motion.div>
          ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
          <Button variant="outline" className="w-full gap-2 rounded-none border-primary/20 text-primary hover:bg-primary hover:text-black">
            Xem tất cả <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
