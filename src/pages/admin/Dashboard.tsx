import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { DollarSign, Users, ShoppingBag, Activity, TrendingUp } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";

const REVENUE_DATA = [
  { name: "T1", total: 120 },
  { name: "T2", total: 240 },
  { name: "T3", total: 180 },
  { name: "T4", total: 320 },
  { name: "T5", total: 450 },
  { name: "T6", total: 380 },
  { name: "T7", total: 600 },
];

const TRAFFIC_DATA = [
  { name: "Mon", visits: 100 },
  { name: "Tue", visits: 150 },
  { name: "Wed", visits: 120 },
  { name: "Thu", visits: 200 },
  { name: "Fri", visits: 180 },
  { name: "Sat", visits: 250 },
  { name: "Sun", visits: 300 },
];

const STATS = [
  {
    title: "Doanh thu tháng",
    value: "2.4 Tỷ",
    change: "+12.5%",
    icon: DollarSign,
    trend: "up"
  },
  {
    title: "Khách hàng mới",
    value: "+150",
    change: "+8.2%",
    icon: Users,
    trend: "up"
  },
  {
    title: "Đơn hàng đang xử lý",
    value: "24",
    change: "-5%",
    icon: ShoppingBag,
    trend: "down"
  },
  {
    title: "Hiệu suất hệ thống",
    value: "99.9%",
    change: "+0.1%",
    icon: Activity,
    trend: "up"
  }
];

export default function Dashboard() {
  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, index) => (
            <Card key={index} className="bg-card/50 backdrop-blur border-primary/20 hover:border-primary/50 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold font-display text-foreground">{stat.value}</div>
                <div className="flex items-center text-xs mt-1">
                   <span className={stat.trend === "up" ? "text-green-500" : "text-red-500"}>
                     {stat.change}
                   </span>
                   <span className="text-muted-foreground ml-1">so với tháng trước</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          {/* Revenue Chart */}
          <Card className="col-span-4 bg-card/50 border-white/10">
            <CardHeader>
              <CardTitle className="text-foreground uppercase flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Biểu đồ doanh thu
              </CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={REVENUE_DATA}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                    <XAxis 
                      dataKey="name" 
                      stroke="#666" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false} 
                    />
                    <YAxis 
                      stroke="#666" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false}
                      tickFormatter={(value) => `${value}Tr`} 
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', borderColor: 'var(--color-primary)' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="total" 
                      stroke="var(--color-primary)" 
                      strokeWidth={2}
                      fillOpacity={1} 
                      fill="url(#colorRevenue)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Traffic Chart */}
          <Card className="col-span-3 bg-card/50 border-white/10">
            <CardHeader>
              <CardTitle className="text-foreground uppercase">Lượt truy cập tuần</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={TRAFFIC_DATA}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                    <XAxis 
                      dataKey="name" 
                      stroke="#666" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false} 
                    />
                    <Tooltip 
                      cursor={{fill: 'rgba(255,255,255,0.05)'}}
                      contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', borderColor: 'var(--color-primary)' }}
                    />
                    <Bar 
                      dataKey="visits" 
                      fill="currentColor" 
                      className="fill-primary" 
                      radius={[4, 4, 0, 0]} 
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
