import AdminLayout from "@/components/admin/AdminLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

const ORDERS = [
  { id: "#ORD-001", customer: "Nguyễn Văn A", package: "Gói 5kWp Tiêu chuẩn", date: "2026-01-19", amount: "72.000.000đ", status: "Completed" },
  { id: "#ORD-002", customer: "Trần Thị B", package: "Gói 3kWp Cơ bản", date: "2026-01-18", amount: "45.000.000đ", status: "Processing" },
  { id: "#ORD-003", customer: "Lê Văn C", package: "Gói 10kWp Cao cấp", date: "2026-01-18", amount: "135.000.000đ", status: "Pending" },
  { id: "#ORD-004", customer: "Phạm Thị D", package: "Gói 5kWp Tiêu chuẩn", date: "2026-01-17", amount: "72.000.000đ", status: "Cancelled" },
  { id: "#ORD-005", customer: "Hoàng Văn E", package: "Gói 5kWp Tiêu chuẩn", date: "2026-01-16", amount: "72.000.000đ", status: "Completed" },
];

export default function OrdersManager() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-500/20 text-green-500 hover:bg-green-500/30";
      case "Processing": return "bg-blue-500/20 text-blue-500 hover:bg-blue-500/30";
      case "Pending": return "bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30";
      case "Cancelled": return "bg-red-500/20 text-red-500 hover:bg-red-500/30";
      default: return "bg-gray-500/20 text-gray-500";
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold uppercase tracking-wide">Quản lý Đơn hàng</h2>
          <p className="text-muted-foreground">Theo dõi và xử lý đơn hàng từ Landing Page.</p>
        </div>

        <div className="rounded-md border border-white/10 bg-card/30 backdrop-blur overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-white/10 hover:bg-white/5">
                <TableHead className="text-primary font-bold">Mã đơn</TableHead>
                <TableHead className="text-primary font-bold">Khách hàng</TableHead>
                <TableHead className="text-primary font-bold">Gói dịch vụ</TableHead>
                <TableHead className="text-primary font-bold">Ngày đặt</TableHead>
                <TableHead className="text-primary font-bold">Tổng tiền</TableHead>
                <TableHead className="text-primary font-bold">Trạng thái</TableHead>
                <TableHead className="text-right text-primary font-bold">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ORDERS.map((order) => (
                <TableRow key={order.id} className="border-white/10 hover:bg-white/5 transition-colors">
                  <TableCell className="font-mono font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.package}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell className="font-mono font-bold">{order.amount}</TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(order.status)} border-none uppercase text-[10px]`}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="hover:text-primary hover:bg-primary/10">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
}
