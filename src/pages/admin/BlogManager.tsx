import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Edit, Trash2, MoreVertical, Calendar } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { format } from "date-fns";

// Mock Data
const INITIAL_POSTS = [
  { 
    id: 1, 
    title: "Xu hướng điện mặt trời áp mái 2026", 
    category: "Tin tức", 
    date: "2026-01-15", 
    status: "Published",
    author: "Admin" 
  },
  { 
    id: 2, 
    title: "Dự án Villa Quận 7 - Hoàn thiện 10kWp", 
    category: "Dự án", 
    date: "2026-01-10", 
    status: "Published",
    author: "Kỹ thuật" 
  },
  { 
    id: 3, 
    title: "Chính sách giá điện mới nhất từ EVN", 
    category: "Tin tức", 
    date: "2026-01-05", 
    status: "Draft",
    author: "Admin" 
  },
  { 
    id: 4, 
    title: "Lợi ích của việc kết hợp AI vào giám sát điện mặt trời", 
    category: "Công nghệ", 
    date: "2026-01-19", 
    status: "Published",
    author: "Admin" 
  },
];

export default function BlogManager() {
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [search, setSearch] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newPost, setNewPost] = useState({ title: "", category: "Tin tức", status: "Draft", content: "" });

  const filteredPosts = posts.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));

  const handleAddPost = () => {
    if (!newPost.title) return;
    
    const post = {
      id: posts.length + 1,
      title: newPost.title,
      category: newPost.category,
      date: format(new Date(), "yyyy-MM-dd"),
      status: newPost.status,
      author: "Admin"
    };
    
    setPosts([post, ...posts]);
    setIsAddOpen(false);
    setNewPost({ title: "", category: "Tin tức", status: "Draft", content: "" });
    toast.success("Đã thêm bài viết mới");
  };

  const handleDelete = (id: number) => {
    setPosts(posts.filter(p => p.id !== id));
    toast.success("Đã xóa bài viết");
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold uppercase tracking-wide">Quản lý Bài viết</h2>
            <p className="text-muted-foreground">Cập nhật tin tức, dự án và kiến thức năng lượng.</p>
          </div>
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary text-black hover:bg-primary/90 font-bold uppercase shadow-[0_0_15px_var(--color-primary)]">
                <Plus className="mr-2 h-4 w-4" /> Viết bài mới
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-primary/20 sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle className="uppercase text-primary">Tạo bài viết mới</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Tiêu đề bài viết</Label>
                  <Input 
                    value={newPost.title}
                    onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                    placeholder="Nhập tiêu đề..." 
                    className="bg-background/50 focus-visible:ring-primary"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Danh mục</Label>
                    <Select 
                      value={newPost.category} 
                      onValueChange={(val) => setNewPost({...newPost, category: val})}
                    >
                      <SelectTrigger className="bg-background/50 border-white/10">
                        <SelectValue placeholder="Chọn danh mục" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Tin tức">Tin tức</SelectItem>
                        <SelectItem value="Dự án">Dự án</SelectItem>
                        <SelectItem value="Kiến thức">Kiến thức</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Trạng thái</Label>
                    <Select 
                      value={newPost.status} 
                      onValueChange={(val) => setNewPost({...newPost, status: val})}
                    >
                      <SelectTrigger className="bg-background/50 border-white/10">
                        <SelectValue placeholder="Trạng thái" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Draft">Bản nháp</SelectItem>
                        <SelectItem value="Published">Công khai</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Nội dung tóm tắt</Label>
                  <Textarea 
                    value={newPost.content}
                    onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                    placeholder="Mô tả ngắn về bài viết..." 
                    className="bg-background/50 focus-visible:ring-primary min-h-[100px]"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddOpen(false)} className="hover:bg-white/10">Hủy</Button>
                <Button onClick={handleAddPost} className="bg-primary text-black hover:bg-primary/90">Đăng bài</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex items-center gap-4 bg-card/30 p-4 rounded-lg border border-white/5 backdrop-blur-sm">
          <Search className="h-5 w-5 text-muted-foreground" />
          <Input 
            placeholder="Tìm kiếm bài viết..." 
            className="bg-transparent border-none focus-visible:ring-0 px-0"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="rounded-md border border-white/10 bg-card/30 backdrop-blur overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-white/10 hover:bg-white/5">
                <TableHead className="text-primary font-bold">Tiêu đề</TableHead>
                <TableHead className="text-primary font-bold">Danh mục</TableHead>
                <TableHead className="text-primary font-bold">Ngày đăng</TableHead>
                <TableHead className="text-primary font-bold">Tác giả</TableHead>
                <TableHead className="text-primary font-bold">Trạng thái</TableHead>
                <TableHead className="text-right text-primary font-bold">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPosts.map((post) => (
                <TableRow key={post.id} className="border-white/10 hover:bg-white/5 group transition-colors">
                  <TableCell className="font-medium group-hover:text-primary transition-colors">{post.title}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 bg-white/5 rounded text-xs border border-white/10">
                      {post.category}
                    </span>
                  </TableCell>
                  <TableCell className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-3 w-3" /> {post.date}
                  </TableCell>
                  <TableCell>{post.author}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                      post.status === 'Published' 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                        : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                    }`}>
                      {post.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-white/10">
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
                          onClick={() => handleDelete(post.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Xóa bài
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
