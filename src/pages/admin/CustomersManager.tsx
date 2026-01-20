import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Phone, MapPin } from "lucide-react";
import avatar1 from "@/assets/avatar-1.jpg";
import avatar2 from "@/assets/avatar-2.jpg";
import avatar3 from "@/assets/avatar-3.jpg";

const CUSTOMERS = [
  { id: 1, name: "Nguyễn Văn A", email: "nguyenvana@gmail.com", phone: "0909 123 456", address: "Q.7, TP.HCM", avatar: avatar1, type: "VIP" },
  { id: 2, name: "Trần Thị B", email: "tranthib@gmail.com", phone: "0912 345 678", address: "Q.2, TP.HCM", avatar: avatar2, type: "New" },
  { id: 3, name: "Lê Văn C", email: "levanc@gmail.com", phone: "0987 654 321", address: "Q.Gò Vấp, TP.HCM", avatar: avatar3, type: "Regular" },
  { id: 4, name: "Phạm Thị D", email: "phamthid@gmail.com", phone: "0933 444 555", address: "Q.Tân Bình, TP.HCM", avatar: null, type: "New" },
  { id: 5, name: "Hoàng Văn E", email: "hoangvane@gmail.com", phone: "0977 888 999", address: "Q.1, TP.HCM", avatar: null, type: "VIP" },
];

export default function CustomersManager() {
  const [search, setSearch] = useState("");
  const filteredCustomers = CUSTOMERS.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold uppercase tracking-wide">Quản lý Khách hàng</h2>
          <p className="text-muted-foreground">Danh sách thông tin khách hàng đã đăng ký tư vấn.</p>
        </div>

        <div className="flex items-center gap-4 bg-card/30 p-4 rounded-lg border border-white/5">
          <Input 
            placeholder="Tìm kiếm theo tên hoặc email..." 
            className="bg-transparent border-none focus-visible:ring-0 px-0"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="rounded-md border border-white/10 bg-card/30 backdrop-blur">
          <Table>
            <TableHeader>
              <TableRow className="border-white/10 hover:bg-white/5">
                <TableHead className="text-primary font-bold">Khách hàng</TableHead>
                <TableHead className="text-primary font-bold">Liên hệ</TableHead>
                <TableHead className="text-primary font-bold">Địa chỉ</TableHead>
                <TableHead className="text-primary font-bold">Phân loại</TableHead>
                <TableHead className="text-right text-primary font-bold">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id} className="border-white/10 hover:bg-white/5 transition-colors">
                  <TableCell className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border border-primary/20">
                      <AvatarImage src={customer.avatar || ""} />
                      <AvatarFallback className="bg-primary/10 text-primary">{customer.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="font-bold text-foreground">{customer.name}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col text-xs space-y-1">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="h-3 w-3" /> {customer.email}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="h-3 w-3" /> {customer.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-3 w-3 text-muted-foreground" /> {customer.address}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                      customer.type === 'VIP' ? 'bg-purple-500/20 text-purple-400' : 
                      customer.type === 'New' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {customer.type}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" className="border-primary/20 hover:bg-primary/20 text-primary">
                      Chi tiết
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
