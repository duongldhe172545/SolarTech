import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Search, Edit, Trash2, MoreVertical } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Mock Data
const INITIAL_PRODUCTS = [
  { id: 1, name: "Gói Solar 3kWp Cơ bản", category: "Gói lắp đặt", price: "45.000.000", stock: 10, status: "Active" },
  { id: 2, name: "Gói Solar 5kWp Tiêu chuẩn", category: "Gói lắp đặt", price: "72.000.000", stock: 5, status: "Active" },
  { id: 3, name: "Gói Solar 10kWp Cao cấp", category: "Gói lắp đặt", price: "135.000.000", stock: 2, status: "Active" },
  { id: 4, name: "Pin Longi 550W Half-cell", category: "Vật tư", price: "2.500.000", stock: 150, status: "Active" },
  { id: 5, name: "Inverter Hybrid 5kW Luxpower", category: "Vật tư", price: "18.000.000", stock: 8, status: "Low Stock" },
];

export default function ProductsManager() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [search, setSearch] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: "", category: "", price: "", stock: "" });

  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  const handleAddProduct = () => {
    const product = {
      id: products.length + 1,
      name: newProduct.name,
      category: newProduct.category,
      price: newProduct.price,
      stock: Number(newProduct.stock),
      status: "Active"
    };
    setProducts([...products, product]);
    setIsAddOpen(false);
    setNewProduct({ name: "", category: "", price: "", stock: "" });
    toast.success("Thêm sản phẩm thành công");
  };

  const handleDelete = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
    toast.success("Đã xóa sản phẩm");
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold uppercase tracking-wide">Quản lý Sản phẩm</h2>
            <p className="text-muted-foreground">Danh sách các gói sản phẩm và vật tư solar.</p>
          </div>
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary text-black hover:bg-primary/90 font-bold uppercase">
                <Plus className="mr-2 h-4 w-4" /> Thêm mới
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-white/10">
              <DialogHeader>
                <DialogTitle className="uppercase text-primary">Thêm sản phẩm mới</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Tên sản phẩm</Label>
                  <Input 
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    placeholder="Nhập tên sản phẩm..." 
                    className="bg-background/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Danh mục</Label>
                  <Input 
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                    placeholder="Ví dụ: Gói lắp đặt" 
                    className="bg-background/50"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Giá (VNĐ)</Label>
                    <Input 
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                      placeholder="45.000.000" 
                      className="bg-background/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Tồn kho</Label>
                    <Input 
                      value={newProduct.stock}
                      onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                      type="number" 
                      placeholder="10" 
                      className="bg-background/50"
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddOpen(false)}>Hủy</Button>
                <Button onClick={handleAddProduct} className="bg-primary text-black hover:bg-primary/90">Lưu sản phẩm</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex items-center gap-4 bg-card/30 p-4 rounded-lg border border-white/5">
          <Search className="h-5 w-5 text-muted-foreground" />
          <Input 
            placeholder="Tìm kiếm sản phẩm..." 
            className="bg-transparent border-none focus-visible:ring-0 px-0"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="rounded-md border border-white/10 bg-card/30 backdrop-blur">
          <Table>
            <TableHeader>
              <TableRow className="border-white/10 hover:bg-white/5">
                <TableHead className="text-primary font-bold">Tên sản phẩm</TableHead>
                <TableHead className="text-primary font-bold">Danh mục</TableHead>
                <TableHead className="text-primary font-bold">Giá bán</TableHead>
                <TableHead className="text-primary font-bold">Tồn kho</TableHead>
                <TableHead className="text-primary font-bold">Trạng thái</TableHead>
                <TableHead className="text-right text-primary font-bold">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id} className="border-white/10 hover:bg-white/5 group transition-colors">
                  <TableCell className="font-medium group-hover:text-primary transition-colors">{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell className="font-mono">{product.price}đ</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    <span className={cn(
                      "px-2 py-1 rounded text-xs font-bold uppercase",
                      product.status === "Active" ? "bg-green-500/20 text-green-500" : "bg-yellow-500/20 text-yellow-500"
                    )}>
                      {product.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-card border-white/10">
                        <DropdownMenuItem className="focus:bg-primary/20 cursor-pointer">
                          <Edit className="mr-2 h-4 w-4" /> Chỉnh sửa
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-red-500 focus:bg-red-500/20 cursor-pointer"
                          onClick={() => handleDelete(product.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Xóa
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
